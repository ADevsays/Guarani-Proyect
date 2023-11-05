<script setup lang="ts">
import Spinner from '../Spinner.vue';
import { ref } from 'vue';
const adminPassword = import.meta.env.VITE_PASSWORD_ADMIN;
const editorPassword = import.meta.env.VITE_PASSWORD_EDITOR;

const inputPassword = ref('');
const isLoad = ref(false);
const error = ref('');

const emit = defineEmits(['correctPassword']);

const checkPassword = (userValue: string) => {
    isLoad.value = true;
    setTimeout(() => {
        if (userValue == adminPassword) {
            emit('correctPassword', {state:false, rol:'admin'});
        }else if(userValue == editorPassword){
            emit('correctPassword', {state:false, rol:'editor'});
        } 
        else {
            error.value = 'Contraseña incorrecta';
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        }
        isLoad.value = false;
    }, 1200);
}

const handleChange = () => {
    const userValue = inputPassword.value;
    if (userValue.length == adminPassword.length) {
        checkPassword(userValue);
    }
};

</script>
<template>
    <main class="text-white flex-column align-items-center position-absolute w-100 bg-dark d-flex"
        style="z-index: 999; height: 113vh;">
        <div v-if="!isLoad"  class="text-center w-50 mb-5" style="height: 200px; margin-top: 120px;">
            <img class="w-100 h-100 object-fit-contain"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Google_Incognito_logo.svg/2048px-Google_Incognito_logo.svg.png"
                alt="Icono de la pestaña de incógnito">
        </div>
        <div  v-else class="d-flex justify-content-center align-items-center mb-5" style="height: 200px; margin-top: 120px;">
            <Spinner/>
        </div>
        <div>
            <input v-model="inputPassword" :readonly="inputPassword.length == adminPassword.length" @input="handleChange" class="p-2 rounded w-100" type="password"
                placeholder="Ingresa la contraseña...">
        </div>
        <p v-show="error" class="text-danger mt-3">{{error}}</p>
        <p class="mt-5">Estás a punto de acceder a una ruta privada...</p>
        <p class="text-warning" style="font-size: 0.8em;">Solo <span class="fw-semibold">escribe</span> la contraseña y espera unos segundos...</p>
    </main>
</template>