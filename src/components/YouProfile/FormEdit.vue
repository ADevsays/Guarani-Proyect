<script setup lang="ts">
import { centerFlex } from '../../consts/communClasses';
import { ref, onMounted } from 'vue';
import InputFormEdit from './InputFormEdit.vue';
import useGetUser from '../../composables/useGetUser';
import { getToken } from '../../helpers/saveToken';
import { tokenName } from '../../consts/userToken';
import { editUser } from '../../server/services/User/editUser';
import { useSessionUser } from '../../store/userSession';

const { user } = useGetUser();
const userStore = useSessionUser();
const emit = defineEmits(['closeModalEdit']);
const token = getToken(tokenName);

const inputsForm = [
    {
        label: 'Nombres',
        placeholder: 'Ingresa tu nombre',
        type: 'text',
        name: 'user_name'
    },
    {
        label: 'Apellidos',
        placeholder: 'Ingresa tu apellido',
        type: 'text',
        name: 'last_name'
    },
    {
        label: 'Email',
        placeholder: 'Ingresa tu email',
        type: 'email',
        name: 'email'
    }
]

const editData = ref<DataToEdit>({
    user_name: '',
    email: '',
    last_name: '',
});

onMounted(() => {
    if (user.value == null) return;
    const userKeys = Object.keys(user.value);
    userKeys.forEach((userKey) => {
        const typeKey = userKey as keyof User;
        if (!(userKey in editData.value)) return;
        const typeUserKey = userKey as keyof DataToEdit;
        if(!user.value)return;
        editData.value[typeUserKey] = user.value[typeKey];
    });
});

const closeModalEdit=()=>{
    emit('closeModalEdit', false);
}

const handleEditUser = async () => {
    try {
        if(!token) return;
        const result = await editUser(editData.value, token);
        if(result){
            const user = await result.json();
            const error = await user.detail;
            if(error) throw new Error('Algo salió mal...');
            userStore.setUser(user);
            closeModalEdit();
        }
    } catch (error) {
        console.error(error);
    }
}

const handleChange = (e: Event) => {
    const input = e.target;
    if (!input) return;
    if (input instanceof HTMLInputElement) {
        const value = input.value;
        const key = input.name;
        if (key in editData.value) {
            const typeKey = key as keyof DataToEdit;
            editData.value[typeKey] = value;
        }
    }
};

const getValueInput = (key: string) => {
    if (key in editData.value) {
        const typeKey = key as keyof DataToEdit;
        if (editData.value[typeKey])
            return editData.value[typeKey];
    }
};

</script>
<template>
    <div class="w-100 h-100 position-absolute top-0 start-0 bg-white" style="z-index: 9;">
        <div :class="centerFlex" class="w-100 position-sticky top-0 flex-column p-3">
            <button
                @click="closeModalEdit" 
                class="btn btn-dark position-absolute p-0 px-2 py-1" style="top: 15px; left: 15px;">
                Volver
            </button>
            <h3 style="color: rgb(0, 0, 41);" class="w-100 fw-bold fs-2 text-center mt-4">Edita tu <span
                    class="text-primary">usuario</span> </h3>
            <form class="w-75" @submit.prevent="handleEditUser">
                <InputFormEdit v-for="input in inputsForm" :handle-change="handleChange" :label="input.label"
                    :name="input.name" :value="getValueInput(input.name)" :placeholder="input.placeholder"
                    :type="input.type" />
                <button class="mt-3 btn btn-primary">Editar usuario</button>
            </form>
        </div>

    </div>
</template>
