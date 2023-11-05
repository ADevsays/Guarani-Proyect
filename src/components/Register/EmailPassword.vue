<script lang="ts" setup>
import CloseEyeIcon from '../SVG/CloseEyeIcon.vue';
import OpenEyeIcon from '../SVG/OpenEyeIcon.vue';
import EmailIcon from '../SVG/EmailIcon.vue';
import LockIcon from '../SVG/LockIcon.vue';
import { reactive, ref, onMounted } from 'vue';

type HtmlRefInput = HTMLElement | null;
const emailPassData = reactive({
    email: '',
    password: ''
});

const showPasswordState = ref(false);
const showPasswordDetails = ref(false);
const inputPassword = ref(null as HtmlRefInput);
const eyeButton = ref(null as HtmlRefInput);

const emit = defineEmits(['getEmailPassword']);

onMounted(() => {
    const registerContainer = document.querySelector('#register_container');
    if(!registerContainer) return null;
    registerContainer.addEventListener('click', (e: Event) => {
        const target = e.target;
        const input = inputPassword.value;
        const eye = eyeButton.value;
        if (target != input && target != eye) hideDetails();
    });
});

const showPassword = () => {
    showPasswordState.value = !showPasswordState.value;
};

const showDetails = () => {
    showPasswordDetails.value = true;
};

const hideDetails = () => {
    showPasswordDetails.value = false;
};

const handleChange = (e: Event) => {
    const input = e.target;
    if (!input) return;
    if (input instanceof HTMLInputElement) {
        const value = input.value;
        const key = input.id;
        if (key == 'email' || key == 'password') {
            emailPassData[key] = value;
        }
    };
    emit('getEmailPassword', emailPassData);
};
</script>

<template>
    <label for="email" class="mt-3 position-relative d-flex flex-column w-full">Email
        <EmailIcon class="position-absolute" style="right: 10px; top: 52%;" />
        <input required @change="handleChange"
            class="placeholder-change p-2 border w-full border-secondary-subtle rounded-1" type="email" id="email"
            placeholder="Ingresa tu email">
    </label>
    <label for="password" class="mt-3 position-relative d-flex flex-column w-full">Contraseña
        <LockIcon class="position-absolute" style="right: 10px; top: 52%;" />
        <input pattern="^(?=.*\d)(?=.*[a-zA-Z])\S*.{7,}$" required @focus="showDetails" @change="handleChange"
            class="placeholder-change p-2 border w-full border-secondary-subtle rounded-1"
            :type="showPasswordState ? 'text' : 'password'" id="password" ref="inputPassword"
            placeholder="Ingresa tu contraseña...">
        <span ref="eyeButton" role="button" @click="showPassword" class="position-absolute p-2 eye" style="top: 36%; right: -35px;">
            <OpenEyeIcon v-show="!showPasswordState" />
            <CloseEyeIcon v-show="showPasswordState" />
        </span>
    </label>
    <div style="height: 15px;">
        <p v-show="showPasswordDetails" class="p-1" style="font-size: .8em;">
            Debe tener al menos <span class="text-danger">7 caracteres </span> y un <span class="text-danger">número.
            </span>
        </p>
    </div>
</template>

<style scoped>
.placeholder-change::placeholder {
    color: rgb(183, 183, 183);
}

.eye:hover {
    cursor: pointer;
    opacity: .8;
}

label {
    font-size: 15px;
}
</style>