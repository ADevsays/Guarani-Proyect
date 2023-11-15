<script setup lang="ts">
import {computed} from 'vue';
const props = defineProps<{
    title: string,
    content: string,
    link: string,
    img: string
}>();
const maxLength = 40;
const getContent = computed(()=>{
    if(props.content.length > maxLength){
        return props.content.substring(0, maxLength) + "...";
    }
    return props.content;
});
</script>

<template>
    <div :style="{
        'background-image': `linear-gradient(to right,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)), 
            url(${props.img})`
        }"
        class="d-flex flex-column rounded align-items-center justify-content-center text-white background-img p-2">
        <h4>{{ props.title }}</h4>
        <p>{{ getContent }}</p>
        <RouterLink class="btn btn-dark opacity-75" :to="props.link">Leer completa</RouterLink>
    </div>
</template>

<style>
.background-img{
    background-size: cover;
}
</style>
