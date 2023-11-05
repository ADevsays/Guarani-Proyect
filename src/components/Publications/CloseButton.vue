<script lang="ts" setup>
import CloseEquisIcon from '../SVG/CloseEquisIcon.vue';
const emit = defineEmits(['closeModal']);

const closeModal=()=>{
    emit('closeModal', false)
}

</script>
<template>
    <span @click="closeModal" class="position-absolute" style="right: 20px; top: 15px; cursor: pointer;">
        <CloseEquisIcon />
    </span>
</template>