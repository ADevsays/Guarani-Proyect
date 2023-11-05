<script lang="ts">
export default{
    methods:{
        goBackPage(){
            this.$router.go(-1);
        }
    }
}
</script>
<template>
    <main class="d-flex vh-100 d-flex justify-content-center align-items-center flex-column">
        <div class="w-25">
            <img class="h-100 w-100" src="https://cdn-icons-png.flaticon.com/512/5372/5372351.png" alt="sad icon img">
        </div>
        <h1 class="mt-5 text-center"> <span class="text-danger">404</span> ruta no existente</h1>
        <button @click="goBackPage" class="btn btn-dark m-3 px-4">Volver</button>
    </main>
</template>