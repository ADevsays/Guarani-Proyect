<script setup lang="ts">
import CardProduct from './CardProduct.vue';

</script>
<template>
    <div class="w-100 mt-5">
        <h3 style="font-size: 1.5em;" class="fw-bold text-center">En descuento</h3>
        <div class="w-100 d-flex h-100 my-5 gap-4 justify-content-center flex-wrap">
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
        </div>
    </div>
</template>