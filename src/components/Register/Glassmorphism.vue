<script lang="ts" setup>
import ImgForm from '../../imgs/ImgForm.webp';
const props = defineProps({
    isRegister: {type:Boolean, default:true}
})

console.log(ImgForm)
</script>
<template>
    <div 
        :class="{'end-0': !props.isRegister}"
        class="hidden-md glassmorphism col-lg-6 h-100 p-0 position-absolute"></div>
    <div class="hidden-md col-lg-6 h-auto p-0">
        <img class="w-100 h-100 m-0 p-0 object-fit-cover"
            :src="ImgForm"
            alt="">
    </div>
</template>

<style >
.glassmorphism {
    background-color: rgba(0, 0, 0, 0.45);
    box-shadow: 0 0 10px 1px rgba(0, 10, 20, 0.25);
    backdrop-filter: blur(15px);
    opacity: .5;
}
</style>