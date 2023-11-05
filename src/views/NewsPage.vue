<script setup lang="ts">
import TitlePage from '../components/TitlePage.vue';
import FeaturedBanner from '../components/News/FeaturedBanner.vue';
import CardNews from '../components/News/CardNews.vue';
const card = new Array(10);
</script>

<template>
    <main class="p-5 h-100">
        <TitlePage title="Lo último que está pasando en la cultura Guaraní" text="Mira aquí las últimas noticias..." />
        <p>No se han generado desde el servidor, cargando place holder...</p>
        <div class="d-flex mt-5 justify-content-center align-items-center w-100">
            <FeaturedBanner />
        </div>
        <div class="w-100 d-flex flex-column justify-content-center align-items-center">
            <h3 class="mt-5">Actualidad</h3>  
            <div class="d-flex flex-wrap gap-4 mt-5 w-75 justify-content-center">
                <CardNews tag="Actualidad" class-tag="text-primary" v-for="_ in card" />
            </div>
        </div>
    </main>
</template>