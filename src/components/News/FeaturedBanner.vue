<script setup lang="ts">
import CardNews from './CardNews.vue';

</script>
<template>
    <div class="bg-secondary-subtle p-5 rounded">
        <h2 class="mb-4">NOTICIAS DESTACADAS</h2>
        <div class="d-flex gap-3 flex-wrap justify-content-center">
            <CardNews tag="Destacado" :is-featured="true" class-tag="text-danger"/>
            <CardNews tag="Destacado" :is-featured="true" class-tag="text-danger"/>
            <CardNews tag="Destacado" :is-featured="true" class-tag="text-danger"/>
            <CardNews tag="Destacado" :is-featured="true" class-tag="text-danger"/>
        </div>
    </div>
</template>