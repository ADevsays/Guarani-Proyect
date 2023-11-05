<script lang="ts" setup>
const props = defineProps<{to:string, bg:string, text:string}>();

</script>
<template>
    <RouterLink class="nav-link d-flex justify-content-center align-items-center flex-column" :to="props.to">
        <div :class="bg" class="hover-scale text-white rounded-circle d-flex justify-content-center flex-column align-items-center" style="width: 50px; height: 50px; font-size: .9em;">
            <slot/>

        </div>
        <p class="m-0 p-0" style="font-size: .9em;">
            {{text}}
        </p>
    </RouterLink>
</template>

<style scoped>
.hover-scale:hover{
    transform: scale(1.03);
    transition: transform 0.1s ease;
}
</style>