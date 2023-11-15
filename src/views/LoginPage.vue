<script setup lang="ts">
import FormLogin from '../components/Login/FormLogin.vue';
import Glassmorphism from '../components/Register/Glassmorphism.vue';
import RegisterContainer from '../components/Register/RegisterContainer.vue';
import RedirectButton from '../components/Login/RedirectButton.vue';
</script>
<template>
    <RegisterContainer>
        <div class="w-100 h-100 position-relative row">
            <div style="padding:70px; padding-top: 50px;"
                class="bg-test d-flex flex-column register-card align-items-center h-100 col-lg-6">
                <h3 style="color: rgb(0, 0, 41);" class="w-100 fw-bold fs-2">Entra a la asamblea del pueblo <span class="text-primary">Guarani</span> </h3>
                <p style="font-size: 12px;" class="text-body-secondary">Ingresa ya a nuestra comunidad</p>
                <FormLogin/>
                <RedirectButton text="¿No tienes una cuenta?" path="/registro">
                    ¡Crea una cuenta aquí!
                </RedirectButton>
            </div>
            <Glassmorphism :is-register="false"/>
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
}</style>