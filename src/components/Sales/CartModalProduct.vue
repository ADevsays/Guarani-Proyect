<script setup lang="ts">
import { centerFlex } from '../../consts/communClasses';
import {computed} from 'vue';
import {useCart} from '../../store/useCart.ts';

const props = defineProps<{
    title:string, 
    price:number,
    url:string,
    id:string,
    repeat: {
        count:number,
        state:boolean
    }
}>();

const cartStore = useCart();

const deleteProduct=()=>{
    cartStore.deleteOneProduct(props.id as string);
};

const getTitle = computed(()=>{
    if(props.title.length > 17){
        return props.title.substring(0, 17) + '...';
    }
    return props.title;
});

</script>
<template>
    <div style="min-height: 90px;" class="d-flex justify-content-between mb-2 align-items-center shadow bg-white p-2 rounded position-relative">
        <span 
            v-show="props.repeat.state" 
            class="position-absolute bg-primary text-white rounded-circle mi_class p-2"
            style="top: 8px; right: 8px; width:17px; height: 17px; font-size: .9em;">
            {{props.repeat.count}}
        </span>
        <button 
            @click="deleteProduct"
            :class="centerFlex" class="btn btn-danger border-0 position-absolute rounded-circle" 
            style="width: 25px; height: 25px; font-size: .8em; top: 0; left: 0;">
            X
        </button>
        <div class="d-flex align-items-center gap-2">
            <div 
                :style="{'background-image': `url(${props.url})`}"
                style="width: 100px; min-height: 70px;  background-position: center; background-size: cover;" 
                class="h-100 rounded"></div>
            <span class="text-secondary">{{getTitle}}</span>
        </div>
        <div :class="centerFlex">
            <h6 class="m-0 p-0">${{props.price}}</h6>
        </div>
    </div>
</template>

<style>
.mi_class{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>