<script lang="ts" setup>
import ImgForm from '../../imgs/ImgForm.webp';
const props = defineProps({
    isRegister: {type:Boolean, default:true}
})
</script>
<template>
    <div 
        :class="{'end-0': !props.isRegister}"
        class="glassmorphism col-lg-6 h-100 p-0 position-absolute"></div>
    <div id="glassImg" class="col-lg-6 h-auto p-0">
        <img class="w-100 h-100 m-0 p-0 object-fit-cover"
            :src="ImgForm"
            alt="">
    </div>
</template>