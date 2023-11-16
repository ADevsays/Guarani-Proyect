<script setup lang="ts">
import { computed, onMounted } from 'vue';
import CartModalProduct from './CartModalProduct.vue';
import checkRepeat from '../../helpers/checkRepeat.ts';
import getRepeatElements from '../../helpers/getRepeatElements.ts';
import getRepeatItemsPaypal from '../../helpers/getRepeatItemsPaypal.ts';
import { PayPalButtonsComponent, loadScript } from '@paypal/paypal-js';
import { ref, watch } from 'vue';

const buttonContainer = ref(null as HTMLRef);
let paypalButtonInstance: PayPalButtonsComponent | undefined;

const props = defineProps<{
    cart: Cart | undefined
}>();

const callPaypalApi = async () => {
    try {
        const response = await loadScript({ clientId: import.meta.env.VITE_PAYPAL_CREDENTIAL + "&locale=es_ES" })
        if (!(window.paypal
            && window.paypal.Buttons
            && buttonContainer.value
            && response)) return;
        updatePaypalAmount('1');
    } catch (error) {
        console.error('Error al cargar el script de PayPal:', error);
    };
};

const updatePaypalAmount = (totalPrice: string) => {
    const arrayItemsFromProducts = props.cart
        ?.products
        .map<ItemProductToSendPaypal>(product => {
            const quantity = String(countOfRepeats(product.id).count)
            return {
                name: product.title,
                description: product.description,
                unit_amount: {
                    value: String(product.price.toFixed(2)),
                    currency_code: 'USD'
                },
                quantity: quantity == '0' ? '1' : quantity
            }
        }) || [];

    const filterItemsProducts = getRepeatItemsPaypal(arrayItemsFromProducts);

    const itemTotal = filterItemsProducts.reduce((acc, item) => {
        return acc + Number(item.unit_amount.value) * Number(item.quantity);
    }, 0);

    const purchase_units = [{
        amount: {
            value: totalPrice,
            breakdown: {
                item_total: {
                    value: String(itemTotal.toFixed(2)),
                    currency_code: 'USD'
                }
            },
        },
        items: filterItemsProducts
    }];

    if (!(window.paypal
        && window.paypal.Buttons
        && buttonContainer.value)) return;

    if (paypalButtonInstance) {
        paypalButtonInstance.close();
    }
    paypalButtonInstance = window.paypal.Buttons({
        style: {
            color: 'blue',
        },
        createOrder: (_data, actions) => {
            return actions.order.create({
                purchase_units
            });
        }
    });
    paypalButtonInstance.render(buttonContainer.value);
};

onMounted(() => {
    callPaypalApi();
});

watch(
    () => props.cart?.totalPrice,
    () => {
        const totalPrice = String(props.cart?.totalPrice.toFixed(2));
        updatePaypalAmount(totalPrice);
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

function countOfRepeats(id: string) {
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
    <div ref="buttonContainer" class="bg-secondary-subtle cart position-absolute rounded p-3" style="">
        <p v-if="getShowMsg" style="font-size: .9em;">No has agregado productos aún...</p>
        <template v-else>
            <h4>Mi orden</h4>
            <CartModalProduct v-for="product in getProducts()" :title="product.title" :url="product.url"
                :price="Number(product.price)" :id="product.id" :repeat="countOfRepeats(product.id)" />
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