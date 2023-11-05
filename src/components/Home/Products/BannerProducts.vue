<script setup lang="ts">
import SliderProducts from './SliderProducts.vue';
</script>
<template>
    <h3 style="font-size: 2.5em;" class="fw-bold text-center mt-5">Nuestros productos</h3>
    <div class="d-flex mb-3 w-75 mt-5 flex-wrap justify-content-center" >
        <div style="width:510px;" class="border card_banner_products p-0 text-center bg-secondary-subtle m-0 mb-2 d-flex justify-content-between align-items-center ">
            <img class="w-50" src="https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png" alt="Producto uno">
            <h3 class="w-100">Nombre del <span class="fw-bold">Producto</span></h3>
        </div>
        <div style="width: 510px;" class="border card_banner_products p-0 text-center bg-secondary-subtle m-0 mt-2 d-flex justify-content-between align-items-center ">
            <h3 class="w-100">Nombre del <span class="fw-bold">Producto</span></h3>
            <img class="w-50" src="https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png" alt="Producto dos">
        </div>
    </div>
    <SliderProducts/>
</template>