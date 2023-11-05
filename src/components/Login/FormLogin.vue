<script setup lang="ts">
import EmailPassword from '../Register/EmailPassword.vue';
import { ref } from 'vue';
import { loginUser } from '../../server/services/User/loginUser.ts';
import { saveToken } from '../../helpers/saveToken.ts';
import ErrorMsg from '../ErrorMsg.vue';

const errorMsg = ref('');

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
        const result = await loginUser(emailPass.value);
        if (result) {
            const user = await result.json();
            const error = await user.detail;
            if (!error) {
                saveToken(user.token, 'user_token');
                window.location.href = "/";
                return;
            }
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
        <button class="mt-3 btn btn-primary">Ingresar ahora</button>
        <ErrorMsg :error-msg="errorMsg" />
    </form>
</template>../../server/services/User/loginUser.ts