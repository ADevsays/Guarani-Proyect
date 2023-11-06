<script setup lang="ts">
import BgImg from '../../imgs/Background_login.webp';

</script>
<template>
     <main id="register_container" class="w-100 background-img d-flex  justify-content-center align-items-center"
        :style="{ backgroundImage: `url(${BgImg})` }">
        <div style="width: 900px; height:auto;" class="d-flex h-full justify-content-center">
            <slot/>
        </div>
    </main>
</template>