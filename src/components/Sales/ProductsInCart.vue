<script setup lang="ts">
import { computed, onMounted } from 'vue';
import CartModalProduct from './CartModalProduct.vue';
import checkRepeat from '../../helpers/checkRepeat.ts';
import getRepeatElements from '../../helpers/getRepeatElements.ts';
import { ref, watch } from 'vue';
import countOfRepeats from '../../helpers/countOfRepeats.ts';
import {callPaypalApi, updatePaypalAmount} from '../../server/services/Paypal/callPaypalAPI.ts';

const buttonContainer = ref(null as HTMLRef);

const props = defineProps<{
    cart: Cart | undefined
}>();

onMounted(() => {
    callPaypalApi(buttonContainer.value as HTMLElement);
});

watch(
    () => props.cart?.totalPrice,
    () => {
        const totalPrice = String(props.cart?.totalPrice.toFixed(2));
        updatePaypalAmount(totalPrice, 
                            props.cart?.products as Product[], 
                            buttonContainer.value as HTMLElement);
    }
)

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


</script>
<template>
    <div ref="buttonContainer" class="bg-secondary-subtle cart position-absolute rounded p-3" style="">
        <p v-if="getShowMsg" style="font-size: .9em;">No has agregado productos aún...</p>
        <template v-else>
            <h4>Mi orden</h4>
            <CartModalProduct 
                v-for="product in getProducts()" 
                :title="product.title" :url="product.url"
                :price="Number(product.price)" 
                :id="product.id" 
                :repeat="countOfRepeats(product.id, props.cart?.products as [])" />
        </template>
        <p class="d-flex bg-white rounded fw-medium mt-3 p-2 w-100 justify-content-between  border">
            <span>Total:</span>
            <span>
                ${{ getTotalPrice }}
            </span>
        </p>
    </div>
</template>
<style scoped>
.cart {
    top: 55px;
    right: 0px;
    width: 350px;
    z-index: 9;
}

@media (max-width: 656px) {
    .cart{
        right: -40px;
        width: 300px;
    }
}
</style>