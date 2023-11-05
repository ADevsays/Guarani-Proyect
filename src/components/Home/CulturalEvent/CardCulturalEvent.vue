<script setup lang="ts">
import LocationIcon from  '../../SVG/LocationIcon.vue';
const props = defineProps({
    isPage: {
        type:Boolean, default: false
    }
});
</script>
<template>
    <RouterLink style="width: 400px;"  to="/eventos" :class="props.isPage ? '' : 'cultural_event_card'" class="d-flex nav-link">
        <div :style="{width: props.isPage ? '400px' : '100%'}" class="rounded-4 w-100 shadow-sm position-relative">
            <div class="w-100">
                <img class="h-100 w-100 rounded-top-4"
                    src="https://assets.survivalinternational.org/pictures/2634/braz-guar-2010-363_1800.jpg" alt="">
            </div>
            <div class="p-3">
                <h4 class="fw-bold text-primary">
                    Nombre del evento
                </h4>
                <p> <span><LocationIcon/></span> Lugar del evento</p>
            </div>
            <span style="width: 50px; right: 30px; bottom: 90px;"
                class="position-absolute d-block lh-1 bg-dark text-white p-1 text-center  rounded">20 <span
                    class="text-danger">Oct</span>
            </span>
        </div>
    </RouterLink>
</template>