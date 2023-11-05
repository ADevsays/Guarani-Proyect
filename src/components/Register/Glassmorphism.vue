<script lang="ts">
export default{
    props:{
        isRegister: {
            type: Boolean, default: true
        }
    } 
}
</script>
<template>
    <div 
        :class="{'end-0': !isRegister}"
        class="glassmorphism col-lg-6 h-100 p-0 position-absolute"></div>
    <div id="glassImg" class="col-lg-6 h-auto p-0">
        <img class="w-100 h-100 m-0 p-0 object-fit-cover"
            src="https://assets.isu.pub/document-structure/230125165855-22286ef55097f109e7b29fbe60ca26d6/v1/823fbb3741c3da9817bd417fcbba4ac4.jpeg"
            alt="">
    </div>
</template>