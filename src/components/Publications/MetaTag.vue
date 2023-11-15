<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue';
const slotContent = ref('');
const { slots } = getCurrentInstance() as any;
onMounted(()=>{
    slotContent.value = slots.default ? slots.default()[0].children : '';
});

</script>
<template>
    <RouterLink class="nav-link" :to="`/buscar/${slotContent}`">
        <span 
            style="font-size: .7em;" 
            class="rounded-4 py-1 px-3 bg-secondary-subtle text-dark">
            <slot/>
        </span>
    </RouterLink>
</template>

<style scoped>
span:hover{
    cursor: pointer;
    opacity: .8;
}
</style>