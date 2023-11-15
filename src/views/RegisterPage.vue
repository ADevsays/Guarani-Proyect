<script setup lang="ts">
import FormRegister from '../components/Register/FormRegister.vue';
import Glassmorphism from '../components/Register/Glassmorphism.vue';
import RegisterContainer from '../components/Register/RegisterContainer.vue'
import RedirectButton from '../components/Login/RedirectButton.vue';
import OverlayPassword from '../components/Register/OverlayPassword.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref, watch, provide} from 'vue';

const route = useRoute();
const regex = /\/registro\/admin/;
const password = ref({
    state:false,
    rol:'' as RoleString
});
provide('rol', password);

onMounted(()=>{
    const path = route.fullPath;
    if(path.match(regex)) password.value.state = true;
    else {
        password.value.state = false;
        password.value.rol = '';
    }
});

watch(
    ()=> route.path,
    (newPath, oldPath)=>{
        if(newPath == '/registro' 
          && oldPath == '/registro/admin'){
            password.value.state = false;
            password.value.rol = '';
        }
    }
);

const checkAdminPassword=(state:{state:boolean, rol:RoleString})=>{
    password.value = state;
}

</script>
<template>
    <OverlayPassword v-if="password.state" @correct-password="checkAdminPassword"/>
    <RegisterContainer v-else>
        <div class="w-100 h-100 position-relative row">
            <Glassmorphism />
            <div style="padding:70px; padding-top: 50px;"
                class="bg-test d-flex flex-column register-card align-items-center h-100 col-lg-6">
                <h3 style="color: rgb(0, 0, 41);" class="fw-bold fs-2">Regístrate <span class="text-primary">ahora</span></h3>
                <p style="font-size: 12px;" class="text-body-secondary">Sé parte de nuestra comunidad</p>
                <FormRegister :password="password"/>
                <RedirectButton text="¿Ya tienes cuenta?" path="/login">
                    ¡Entra aquí!
                </RedirectButton>
            </div>
        </div>
    </RegisterContainer>
</template>

<style>
.bg-test{
    background-color: rgba(255, 255, 255, 0.7);
}
.background-img {
    background-position: center;
    background-size: cover;
    height: 100vh;
}
</style>

