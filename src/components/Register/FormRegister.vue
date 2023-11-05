<script setup lang="ts">
import PersonIcon from '../SVG/PersonIcon.vue';
import PeopleIcon from '../SVG/PeopleIcon.vue';
import EmailPassword from './EmailPassword.vue';
import ErrorMsg from '../ErrorMsg.vue';
import AdminRoleRegister from './AdminRoleRegister.vue';
import { registerUser } from '../../server/services/User/registerUser.ts';
import { useSessionUser } from '../../store/userSession.ts';
import { saveToken } from '../../helpers/saveToken.ts';
import { ref, reactive, onMounted } from 'vue';

const props = defineProps<{ password: { state: boolean, rol: RoleString } }>();
const userStore = useSessionUser();
const userData: DataToRegister = reactive({
    "user_name": "",
    "last_name": "",
    "email": "",
    "password": ""
});
const stateRole = ref<RoleString>('');
const errorMsg = ref('');

onMounted(() => {
    stateRole.value = props.password.rol;
});

const getPasswordEmail = (emailPassword: { email: string, password: string }) => {
    const keys = Object.keys(emailPassword);
    keys.forEach(key => {
        if (key == 'email' || key == 'password') {
            userData[key] = emailPassword[key];
        };
    });
};

const getRole = (role: RoleString) => {
    stateRole.value = role;
    console.log(role)
};

const showError = (error: string) => {
    errorMsg.value = error;
    setTimeout(() => {
        errorMsg.value = '';
    }, 3000);
};

const handleChange = (e: Event) => {
    const input = e.target;
    if (!input) return;
    if (input instanceof HTMLInputElement) {
        const value = input.value;
        const key = input.id;
        if (key == 'user_name' || key == 'last_name') {
            userData[key] = value;
        }
    };
};

const handleRegister = async () => {
    try {
        const result = await registerUser(userData, stateRole.value);
        if (!result) {
            showError('Parece que hubo un error con el servidor');
            return;
        }
        const user = await result.json();
        const error = await user.detail;
        if (error) {
            showError('Esta cuenta de correo ya existe');
            return;
        };
        saveToken(user.token, 'user_token');
        userStore.setUser(user);
        window.location.href = "/";
    } catch (error) {
        console.error(error);
    }
};


</script>
<template>
    <form class="w-100" @submit.prevent="handleRegister">
        <label for="user_name" class="position-relative d-flex flex-column">Nombres
            <PersonIcon class="position-absolute" style="right: 10px; top: 52%;" />
            <input required @change="handleChange" class="placeholder-change p-2 border border-secondary-subtle rounded-1"
                type="text" id="user_name" placeholder="Ingresa tu nombre">
        </label>
        <label for="last_name" class="mt-3 position-relative d-flex flex-column">Apellidos
            <PeopleIcon class="position-absolute" style="right: 10px; top: 52%;" />
            <input @change="handleChange" class="placeholder-change p-2 border border-secondary-subtle rounded-1"
                type="text" id="last_name" placeholder="Ingresa tu apellido">
        </label>
        <EmailPassword @get-email-password="getPasswordEmail" />
        <AdminRoleRegister v-if="props.password.rol != ''" @set-option-state="getRole" />
        <button class="mt-3 btn btn-primary">Comenzar experiencia</button>
        <ErrorMsg :error-msg="errorMsg" />
    </form>
</template>

<style scoped>
.placeholder-change::placeholder {
    color: rgb(183, 183, 183);
}

label {
    font-size: 15px;
}
</style>