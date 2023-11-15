<script setup lang="ts">
import AllProducts from '../components/Sales/AllProducts.vue';
import FormUploadSales from '../components/Sales/FormUploadSales.vue';
import Spinner from '../components/Spinner.vue';
import TitlePage from '../components/TitlePage.vue';
import useModalForm from '../composables/useModalForm';
import { centerFlex } from '../consts/communClasses';
import {ref, watch, onMounted} from 'vue';
import {getAllProducts} from '../server/services/Products/getAllProducts.ts'
import {useAllProducts} from '../store/useProducts.ts';
import Cart from '../components/Sales/Cart.vue';
import { useCart } from '../store/useCart';

const {checkIfIsAdmin, 
        openModal,
        editID,
        closeModalFn, 
        openModalFn, 
        editModal} = useModalForm();

const productsStore = useAllProducts();
const cartStore = useCart();
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
    products.value = newProducts.reverse();
    loadProducts.value = true;
});

watch(
    () => productsStore.products,
    () => products.value = productsStore.getProducts()
);

const addToCart=(product:Product)=>{
    cartStore.addProduct(product);
    cartStore.plusToTotalPrice(Number(product.price));
};

</script>
<template>
    <main class="p-5 h-100" style="min-height: 100vh;">
        <TitlePage title="Productos creados por nuestras comunidades" text="¡Puedes llevarte uno ahora!" />
        <Cart :cart="cartStore.getcart()"/>
        <FormUploadSales v-if="openModal.state" @close-modal="closeModalFn" :id="editID" :type="openModal.content" />
        <div :class="centerFlex" class="flex-column">
            <button 
                v-if="checkIfIsAdmin" 
                @click="openModalFn({ content: 'upload', value: true })"
                class="w-50 btn btn-primary m-3">Crear producto</button>
            <Spinner border-color="#09f" v-if="!loadProducts" />
            <div v-else>
                <p v-show="serverError">Parece que hubo algún <span class="text-danger">problema</span> con el servidor, no
                    se han podido recuperar los productos</p>
                <div v-if="products.length <= 0" class="text-center mt-4">
                    No se han encontrado <span class="text-danger">productos.</span>
                </div>
                <template v-if="products.length > 0">
                    <AllProducts @add-to-cart="addToCart" @edit-new="editModal" :products="products" />
                </template>
            </div>
        </div>
    </main>
</template>