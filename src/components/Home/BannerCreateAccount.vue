<script setup lang="ts">
import AvatarsIcon from '../../imgs/Avatars.png';
const props = defineProps<{
    title:string, 
    text:string, 
    button: string,
    to: string
}>();
</script>
<template>
    <div class="bg-primary rounded border justify-content-evenly align-items-center border-5 border-dark m-5 p-3 px-4 d-flex" style="height: 220px;">
        <div class="text-white text-center" style="font-size: 1em;">
            <h3>
                {{props.title}}
            </h3>
            <p class="d-none d-sm-block">
                {{props.text}}
            </p>
            <RouterLink :to="props.to" class="btn btn-light">
                {{props.button}}
            </RouterLink>
        </div>
        <div style="width: 20%;">
            <img class="w-100 h-100" :src="AvatarsIcon" alt="">
        </div>
    </div>
</template>