<script lang="ts">
export default{
    props:{
        errorMsg:String
    }
}
</script>
<template>
    <div v-if="errorMsg" 
        class="text-center text-white m-3 flex-column position-absolute bg-danger rounded p-4 " 
        style="width: 300px; z-index: 999; top: 30%; left: calc(50% - 150px);">
        <h5 class="fw-normal">{{ errorMsg }}</h5>
        <p class="fw-bold">Intenta nuevamente</p>
    </div>
</template>