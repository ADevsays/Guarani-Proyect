<script setup lang="ts">
import { computed } from 'vue';
import CartModalProduct from './CartModalProduct.vue';
import checkRepeat from '../../helpers/checkRepeat.ts';
import getRepeatElements from '../../helpers/getRepeatElements.ts';
// import {ref} from 'vue';

const props = defineProps<{
    cart: Cart | undefined
}>();

const getTotalPrice = computed(() => {
    if (props.cart) {
        return Number(props.cart.totalPrice.toFixed(2));
    }
});

const getShowMsg = computed(() => {
    if (props.cart?.products) {
        return props.cart.products.length <= 0;
    }
    return true;
});

const getProducts = () => {
    const ids = props.cart?.products.map(product => {
        return product.id;
    });
    if (!ids) return;
    if (checkRepeat(ids)) {
        if (!props.cart) return [];
        const products = props.cart.products;
        const deleteRepeats = getRepeatElements(products)
        return deleteRepeats as Product[];
    }
    return props.cart?.products;
};

const countOfRepeats = (id: string) => {
    const thereAreRepeat = {
        state: false,
        count: 0
    };
    const oneRepeatElement = props.cart?.products.filter(product => product.id == id);
    if (checkRepeat(oneRepeatElement as Product[])) {
        thereAreRepeat.state = true;
        thereAreRepeat.count = oneRepeatElement?.length ?? 0;
        return thereAreRepeat;
    }
    return thereAreRepeat;
}

</script>
<template>
    <div class="bg-secondary-subtle  position-absolute rounded p-3" style="top:55px; right: 0px; width: 350px;z-index: 9;">
        <p v-if="getShowMsg" style="font-size: .9em;">No has agregado productos aún...</p>
        <template v-else>
            <h4>Mi orden</h4>
            <CartModalProduct 
                v-for="product in getProducts()" 
                :title="product.title" 
                :url="product.url"
                :price="Number(product.price)"
                :id="product.id" 
                :repeat="countOfRepeats(product.id)" />
        </template>
        <p class="d-flex bg-white rounded fw-medium mt-3 p-2 w-100 justify-content-between  border">
            <span>Total:</span>
            <span>
                ${{ getTotalPrice }}
            </span>
        </p>
        <button class="btn btn-primary w-100">Comprar</button>
    </div>
</template>