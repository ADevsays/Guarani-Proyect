<script setup lang="ts">
import CardProduct from './CardProduct.vue';
const props = defineProps<{
    products: Product[]
}>()
</script>
<template>
    <div class="w-100 mt-5">
        <h3 style="font-size: 1.5em;" class="fw-bold text-center">En descuento</h3>
        <div class="w-100 d-flex h-100 my-5 gap-4 justify-content-center flex-wrap">
            <p v-if="props.products.length <= 0">No hay productos en descuento...</p>
            <CardProduct v-else v-for="product in props.products" :product="product"/>
        </div>
    </div>
</template>