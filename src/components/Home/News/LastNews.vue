<script setup lang="ts">
import NewsSlider from './NewsSlider.vue';
</script>

<template>
    <div class="w-100 d-flex flex-column justify-content-center align-items-center mt-5">
        <h3 style="font-size: 2.5em;" class="fw-bold text-center">Qué está pasando...</h3>
        <NewsSlider/>
        <RouterLink class="btn btn-light m-3 border border-black" to="/noticias">Todas las noticias</RouterLink>
    </div>
</template>
