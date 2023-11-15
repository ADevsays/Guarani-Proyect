<script setup lang="ts">
import { centerFlex } from '../../consts/communClasses';
import CartIcon from '../SVG/CartIcon.vue';
import ProductsInCart from './ProductsInCart.vue';
import {computed, ref} from 'vue';

const props = defineProps<{
    cart: Cart | undefined
}>()

const stateModalProducts = ref(false);

const getCountOfProducts = computed(()=>{
    if(props.cart){
        return props.cart.products.length; 
    }
});

const getShow= computed(()=>{
    if(props.cart){
        return props.cart.products.length > 0; 
    }
});

const showProducts =()=>{
    stateModalProducts.value = !stateModalProducts.value;
}

</script>
<template>
    <div class="w-100 d-flex justify-content-end position-relative">
        <button @click="showProducts" class="bg-warning border-0 text-vlack rounded-circle" :class="centerFlex" style="width: 40px; height: 40px;">
            <CartIcon/>
        </button>
        <span
            v-if="getShow"
            class="position-absolute bg-primary text-white rounded-circle" 
            :class="centerFlex"
            style="bottom:-10px; right: 0px; width: 19px; height: 19px;">{{getCountOfProducts}}</span>
        <ProductsInCart v-show="stateModalProducts" :cart="props.cart"/>
    </div>
</template>