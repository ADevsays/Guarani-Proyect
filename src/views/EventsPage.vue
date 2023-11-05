<script setup lang="ts">
import CardEvent from  '../components/Home/CulturalEvent/CardCulturalEvent.vue';
import TitlePage from '../components/TitlePage.vue';
const cards = new Array(20);
</script>
<template>
    <main class="p-5 h-100">
        <TitlePage title="Eventos culturales próximos..." text="Mantente informado acerca de los eventos que se irán realizando en las siguientes fechas..."/>
        <p>No se han generado desde el servidor, cargando placeholder...</p>
        <div class="mt-4 d-flex gap-4 justify-content-evenly align-items-center flex-wrap">
            <CardEvent v-for="_ in cards" :isPage="true"/>
        </div>
    </main>
</template>