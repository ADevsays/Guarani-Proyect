<script setup lang="ts">
const props = defineProps<{
    product: Product,
    show?:boolean | true
}>()
</script>
<template>
    <RouterLink to="/productos" class="nav-link">
        <div class="  text-center d-flex flex-column justify-content-center position-relative align-items-center">
            <span v-show="props.show" class="bg-danger text-white px-2 position-absolute top-0 start-0">15%</span>
            <div class="bg-secondary-subtle" style="width: 240px; height: 250px;">
                <img class="w-100 h-100 object-fit-cover border"
                    :src="props.product.url"
                    :alt="props.product.title">
            </div>
            <div class="mt-2">
                <h4 class="fw-bold fs-6">{{props.product.title}}</h4>
                <p>${{props.product.price}}</p>
            </div>
            <RouterLink to="/Productos" class="w-100 btn btn-dark">Ver más</RouterLink>
        </div>
    </RouterLink>
</template>