<script setup lang="ts">
import { centerFlex } from '../../consts/communClasses';
import Spinner from '../Spinner.vue';

const props = defineProps({
    loadUser:{
        type: Boolean, default:false
    }, 
    text: String
});

</script>
<template>
    <button class="mt-3 btn btn-primary" :class='centerFlex' >
        <Spinner v-show="!props.loadUser" style="width: 25px; height: 25px;"/>
        <span v-show="props.loadUser">{{props.text}}</span>
    </button>
</template>