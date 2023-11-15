<script setup lang="ts">
import { centerFlex } from '../../consts/communClasses';
import InfoIcon from '../SVG/InfoIcon.vue';
import {ref} from 'vue';

const props = defineProps({
    topContent: {
        type:String, requiered: false, default: '40%'
    },
    topButton: {
        type:String, requiered: false, default: '48%'
    },
    type: String
});

const objStyles = {
    'background-color': "#002d71",
    'font-size': '.9em',
    'right': '48px',
    'top': props.topContent
};

const objButton = {
    'right': '25px',
    'top': props.topButton
}

const showInfo = ref(false);
const handleInfo=()=>{
    showInfo.value = true;
};
const closeInfo=()=>{
    showInfo.value = false;
}
</script>
<template>
    <span @mouseover="handleInfo" @mouseout="closeInfo" class="position-absolute" :style="objButton">
        <InfoIcon/>
    </span>
    <div 
        :style="objStyles"
        :class="centerFlex" 
        class="text-white rounded position-absolute px-2 py-3" 
        v-if="showInfo">
        <p class="p-0 m-0">
            Al escribir tu {{props.type}} ten en cuenta lo siguiente:
            <div v-show="props.type != 'Producto'">
                <p class="fw-medium p-0 m-0">1- Utiliza saltos de línea.</p>
                <p class="fw-medium p-0 m-0">
                    2- Si quieres agregar subítulos a tu {{props.type}}, <br> puedes utilizar el formato "[Subtítulo]" entre llaves.
                </p>
            </div>
            <p v-show="props.type == 'Producto'" class="fw-medium p-0 m-0">
                Si quieres poner tu {{props.type}} en descuento, <br> puedes utilizar el formato //"Descuento: 12%"// entre barras.
            </p>
        </p>
    </div>
</template>