<script setup lang="ts">
import CardProduct from './CardProduct.vue';
const props = defineProps<{
    products: Product[]
}>();
const emit = defineEmits(['editNew', 'addToCart']);

const handleEdit=(modal:any)=>{
    emit('editNew', modal);
}

const addToCart=(product:Product)=>{
    emit('addToCart', product)
}

</script>
<template>
    <div class="w-100 mt-5 d-flex flex-column gap-5 justify-content-center align-items-center">
        <CardProduct 
            v-for="product in props.products"
            @edit-new="handleEdit"
            @add-to-cart="addToCart"
            :title="product.title"
            :description="product.description"
            :price="Number(product.price)"
            :id="String(product.id)"
            :url="product.url"/>              
    </div>
</template>