<script setup lang="ts">
import TitlePage from '../components/TitlePage.vue';
</script>
<template>
    <main class="h-100 p-5">
        <TitlePage title="Sobre nosotros..." text="Descubre qué nos trajo a dónde estamos..."/>
        <div class="row justify-content-between">
            <div class="col-12 col-md-6">
                <h4 class="text-primary">Nuestra historia</h4>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quo ipsam rerum assumenda iste perspiciatis cum magnam hic laboriosam dolor.</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quo ipsam rerum assumenda iste perspiciatis cum magnam hic laboriosam dolor.</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quo ipsam rerum assumenda iste perspiciatis cum magnam hic laboriosam dolor.</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quo ipsam rerum assumenda iste perspiciatis cum magnam hic laboriosam dolor.</p>
            </div>
            <div class="col-12 col-md-6 justify-content-center align-items-center d-flex" style="width: 560px;">
                <img loading="lazy" style="min-height: 220px;" class="bg-secondary-subtle w-100 border h-100 rounded object-fit-cover" src="https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Production%20Library/08-08-2023-UNICEF-Indigenous-Ayacucho.jpg/image1170x530cropped.jpg" alt="">
            </div>
        </div>

        <div class="row justify-content-between mt-5">
            <div class="col-12 col-md-6 justify-content-center align-items-center d-flex" style="width: 560px;">
                <img loading="lazy" style="min-height: 220px;" class=" bg-secondary-subtle  w-100 border h-100 rounded object-fit-cover" src="https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Production%20Library/08-08-2023-UNICEF-Indigenous-Ayacucho.jpg/image1170x530cropped.jpg" alt="">
            </div>
            <div class="col-12 col-md-6">
                <h4 class="text-primary">Más datos</h4>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quo ipsam rerum assumenda iste perspiciatis cum magnam hic laboriosam dolor.</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quo ipsam rerum assumenda iste perspiciatis cum magnam hic laboriosam dolor.</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quo ipsam rerum assumenda iste perspiciatis cum magnam hic laboriosam dolor.</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quo ipsam rerum assumenda iste perspiciatis cum magnam hic laboriosam dolor.</p>
            </div>
        </div>
        <RouterLink to="/" class="btn btn-primary mt-5">Volver al inicio</RouterLink>
    </main>
</template>