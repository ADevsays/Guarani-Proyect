<script setup lang="ts">
import CardCulturalEvent from './CardCulturalEvent.vue';
</script>
<template>
    <h3 style="font-size: 2.5em;" class="fw-bold text-center mt-5">Próximos Eventos</h3>
    <div class="d-flex w-100 flex-wrap justify-content-center p-5 gap-5">
        <CardCulturalEvent/>
        <CardCulturalEvent/>
    </div>
    <RouterLink to="/eventos" class="btn btn-primary">
            Todos los eventos
        </RouterLink>
</template>