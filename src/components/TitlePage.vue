<script setup lang="ts">
const props = defineProps({
    title:String, 
    text:String
});
</script>
<template>
    <h1>{{props.title}}</h1>
    <p class="mb-5">
        {{props.text}}
    </p>
    <hr>
</template>