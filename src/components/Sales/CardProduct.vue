<script setup lang="ts">
import {computed, ref, onMounted} from 'vue';
import PlaceholderImg from '../../imgs/Imagen_Placeholder.webp';
import loadImg from '../../helpers/loadImg';
import ButtonOptions from '../Publications/ButtonOptions.vue';
import useGetUser from '../../composables/useGetUser';
import typesFormPublication from '../../consts/typesFormPublication';
import { getToken } from '../../helpers/saveToken';
import { tokenName } from '../../consts/userToken';
import {deleteProduct} from '../../server/services/Products/deleteProduct.ts'
import { useAllProducts } from '../../store/useProducts';

const props = defineProps<{
    title:string,
    description: string,
    price:number,
    id:string,
    url:string
}>();

const productsStore = useAllProducts();

const imgState = ref(false);
const {user} = useGetUser();
const emit = defineEmits(['editNew', 'addToCart']);
const token = getToken(tokenName)
const showMsg = ref(false);

onMounted(() => {
    imgState.value = false;
    if (props.url) {
        loadImg(props.url)
            .then(() => imgState.value = true);
    }
});

const getImg = computed(() => {
    if (!props.url) return PlaceholderImg;
    if (imgState.value) return props.url;
    return PlaceholderImg;
});

const getDescription = computed(() => {
    if (props.description) {
        if (props.description.length > 90) {
            return props.description.substring(0, 90) + '...';
        };
        return props.description;
    }
});

const checkRolUser = computed(()=>{
    if(user.value){
        return user.value.rol == 'admin' 
              || user.value.rol == 'editor';
    }
});

const handleEditProduct=()=>{
    emit('editNew', {content:typesFormPublication.EDIT_VR, value:true, id:props.id});
}
const deleteProductFn= async ()=>{
    const userConfirm = confirm('¿Está seguro de que desea eliminar este producto? Esta acción NO se puede deshacer.')
    if(!userConfirm) return;
    try {
        if(!token) return;
        if(!props.id) return;
        const result = await deleteProduct(token, props.id);
        if(!result) throw new Error('No se ha podido eliminar');
        const deleteProductUser = await result.json();
        if(deleteProductUser){
            productsStore.deleteProducts(props.id);
        }
    } catch (error) {
        console.error(error);
    }
}

const addToCart=()=>{
    emit('addToCart', props as Product);
    showMsg.value = true;
    setTimeout(()=>{
        showMsg.value = false;
    }, 3000);
};

</script>
<template>
    <div class="h-100 position-relative shadow rounded card_product" style="">
        <ButtonOptions
            :check-rol-user="checkRolUser"
            @edit-publication="handleEditProduct"
            @delete-publication="deleteProductFn"
        />
        <div class="position-relative rounded shadow card_product_first-child">
            <img
                class="w-100 h-100 rounded user-select-none" 
                :src="getImg"
                :alt="props.title">
        </div>
        <div class="position-absolute p-4 card_product_text" style="">
            <h3 class="fw-medium">{{props.title}}</h3>
            <h5 class="fw-normal" style="font-size: 3.4em; color: rgb(47, 3, 3);"> 
                <span style="font-size: 0.8em;">$</span>{{props.price}}
            </h5>
            <p class="text-secondary">{{getDescription}}</p>
            <button @click="addToCart" class="btn btn-warning fw-medium  p-2 px-3">Añadir al carrito</button>
            <p v-show="showMsg" class="w-100 mt-3 text-success" style="font-size: .9em;">¡Se ha agregado correctamente!</p>
        </div>
    </div>
</template>

<style>
.card_product{
    min-width: 440px;
    min-height: 400px;
    background-color: rgb(241, 241, 241);
    display: flex;
}

.card_product_first-child{
    max-width: 260px; 
    left: -90px;
    top: 24px;
    height: 350px !important;
}

.card_product_first-child img{
    object-fit: cover !important;
    object-position: center;
}

.card_product_text{
    right: 0; 
    max-width: 60%;
    min-width: 270px;
}

@media (max-width: 656px){
    .card_product{
        width: 100% !important;
        min-width: 0px !important;
        min-height: 0px !important;
        background-color: rgb(241, 241, 241);
        display: flex;
        flex-wrap: wrap;
    }
    .card_product_first-child{
        height: auto !important;
    }
    .card_product div:nth-child(2){
        min-width: 100%;
        max-height: 320px !important;
        position:static !important; 
        left: 0px;
    }
    .card_product div:nth-child(3){
        right: 0; 
        min-width: 100%;
        position:static !important; 
    }
    .card_product div:nth-child(3)  h5{
        font-size: 2em !important;
    }
}
</style>