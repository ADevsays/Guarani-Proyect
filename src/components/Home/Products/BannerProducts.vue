<script setup lang="ts">
import { getAllProducts } from '../../../server/services/Products/getAllProducts';
import { useAllProducts } from '../../../store/useProducts';
import SliderProducts from './SliderProducts.vue';
import {ref, onMounted, computed} from 'vue';
import PlaceholderImg from '../../../imgs/Imagen_Placeholder.webp';
import { useSearch } from '../../../store/useSearch';

const productsStore = useAllProducts();
const searchStore = useSearch();
const loadProducts = ref(false);
const serverError = ref(false);
const products = ref<Product[]>([]);

onMounted(async () => {
    const result = await getAllProducts();
    if (!result) {
        serverError.value = true;
        loadProducts.value = true;
        return;
    }
    const newProducts = await result.json();
    productsStore.setproducts(newProducts);
    searchStore.setAllSearch(newProducts, 'products');
    products.value = newProducts.reverse();
    loadProducts.value = true;
});

const getTitle = (id:number)=>{
    if(products.value){
        const product = products.value[id];
        return product?.title;
    }
    return 'Cargando...'
};

const getUrl = (id:number)=>{
    if(products.value){
        const product = products.value[id];
        return product?.url ?? PlaceholderImg;
    }
    return PlaceholderImg;
};

const getProducts = computed(()=>{
    if(!products.value) return [];
    if(products.value.length > 4){
        return products.value.slice(0, 4);
    }
    return products.value;
});

</script>
<template>
    <h3 style="font-size: 2.5em;" class="fw-bold text-center mt-5">Nuestros productos</h3>
    <div class="d-flex mb-3 w-75 mt-5 flex-wrap justify-content-center" >
        <div style="width:510px; background-color: rgba(122, 122, 122, 0.2);" class="border card_banner_products p-0 text-center m-0 mb-2 d-flex justify-content-between align-items-center ">
            <img 
                class="w-50 object-fit-cover rounded rounded-end-0" 
                style="height: 100%; min-height: 150px; max-height: 250px;" :src="getUrl(0)" :alt="getTitle(0)">
            <h3 class="w-100 fw-bold p-2">{{getTitle(0)}}</h3>
        </div>
        <div style="width: 510px; background-color: rgba(122, 122, 122, 0.2);" class="border card_banner_products p-0 text-center m-0 mt-2 d-flex justify-content-between align-items-center ">
            <h3 class="w-100 fw-bold p-1">{{getTitle(2)}}</h3>
            <img 
                class="w-50 object-fit-cover rounded rounded-start-0" 
                style="height: 100%; min-height: 150px; max-height: 250px;" :src="getUrl(2)" :alt="getTitle(2)">
        </div>
    </div>
    <SliderProducts :products="getProducts"/>
</template>