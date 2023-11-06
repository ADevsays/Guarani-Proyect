<script setup lang="ts">
import EmailPassword from '../Register/EmailPassword.vue';
import { ref } from 'vue';
import { loginUser } from '../../server/services/User/loginUser.ts';
import { saveToken } from '../../helpers/saveToken.ts';
import ErrorMsg from '../ErrorMsg.vue';
import ButtonForm from '../Register/ButtonForm.vue';

const errorMsg = ref('');
const loadUser = ref(true);

const emailPass = ref<DataToLogin>({
    email: '', password: ''
});
const getEmailPassword = (emailPassData: { email: string, password: string }) => {
    emailPass.value = emailPassData;
};

const showError = (error:string) => {
    errorMsg.value = error;
    setTimeout(() => {
        errorMsg.value = '';
    }, 3000);
}

const handleSubmit = async () => {
    try {
        loadUser.value = false;
        const result = await loginUser(emailPass.value);
        if (result) {
            const user = await result.json();
            const error = await user.detail;
            if (!error) {
                loadUser.value = true;
                saveToken(user.token, 'user_token');
                window.location.href = "/";
                return;
            }
            loadUser.value = true;
            showError('Hubo algún error al ingresar las credenciales');
        }else{
            showError('Parece que hubo un error con el servidor');
        }

    } catch (error) {
        console.error(error);
    }
};
</script>
<template>
    <form class="w-100" @submit.prevent="handleSubmit">
        <EmailPassword @get-email-password="getEmailPassword" />
        <ButtonForm 
            style="min-width: 190px;"  
            text="Comenzar experiencia"
            :load-user="loadUser"/>
        <ErrorMsg :error-msg="errorMsg" />
    </form>
</template>