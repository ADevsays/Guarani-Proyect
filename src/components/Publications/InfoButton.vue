<script setup lang="ts">
import { centerFlex } from '../../consts/communClasses';
import InfoIcon from '../SVG/InfoIcon.vue';
import {ref} from 'vue';
const showInfo = ref(false);
const handleInfo=()=>{
    showInfo.value = true;
};
const closeInfo=()=>{
    showInfo.value = false;
}
</script>
<template>
    <span @mouseover="handleInfo" @mouseout="closeInfo" class="position-absolute" style="top: 46%; right: 25px;">
        <InfoIcon/>
    </span>
    <div 
        style="background-color: #002d71; font-size: .9em;  top: 40%; right: 48px;"
        :class="centerFlex" 
        class="text-white rounded position-absolute px-2 py-3" 
        v-if="showInfo">
        <p class="p-0 m-0">
            Al escribir tu publicación ten en cuenta lo siguiente:
            <p class="fw-medium p-0 m-0">1- Utiliza saltos de línea.</p>
            <p class="fw-medium p-0 m-0">
                2- Si quieres agregar subítulos a tu publicación, <br> puedes utilizar el formato "[Subtítulo]" entre llaves.
            </p>
        </p>
    </div>
</template>