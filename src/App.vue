<script setup lang="ts">
import Header from './components/NavBar/Header.vue';
import Footer from './components/Footer/Footer.vue';

</script>

<template>
    <Header />
    <RouterView />
    <Footer/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap');
html{
    scroll-behavior: auto !important;
}
body {
    font-family: 'Rubik', sans-serif !important;
}

@media (max-width:992px){
    .hidden-md{
        display: none;
    }
}

</style>