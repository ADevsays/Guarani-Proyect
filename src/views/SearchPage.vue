<script setup lang=ts>
import { useRoute } from 'vue-router';
const location = useRoute();
</script>
<template>
    {{location.params}}
</template>