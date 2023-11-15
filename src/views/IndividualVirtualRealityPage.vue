<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Spinner from '../components/Spinner.vue';
import { centerFlex } from '../consts/communClasses';
import { get3dOneObject } from '../server/services/ObjectVirtual/get3dOneObject.ts';
import useTHREE from '../composables/useTHREE.ts';
import { url } from '../server/url';
import { useRoute } from 'vue-router';
import MetaTag from '../components/Publications/MetaTag.vue';
import ShowContent from '../components/Publications/ShowContent.vue';
import useSEO from '../helpers/useSEO';

const route = useRoute();
const canvasHTML = ref<HTMLRef>(null);
const container = ref<HTMLRef>(null);
const isLoad = ref(false);
const serverError = ref(false);
const publication = ref({} as ObjectVirtual);

const getUrl = async () => {
    try {
        if (!route.params.id) return;
        const result = await get3dOneObject(route.params.id as string);
        if (!result) throw new Error('No se ha obtenido ninguna imagen');
        const image3d = await result.json();
        if (!image3d) throw new Error('Ha habido un error fatal');
        publication.value = image3d;
        return `${url}${image3d.image}`;
    } catch (error) {
        console.error(error);
    }
}

onMounted(async () => {
    if (!(canvasHTML.value instanceof HTMLCanvasElement)) return;
    const imgUrl = await getUrl();
    if (!imgUrl) {
        serverError.value = true;
        isLoad.value = true;
        return;
    };
    useTHREE(canvasHTML.value, imgUrl, container.value as HTMLElement);
    setTimeout(() => {
        isLoad.value = true;
    }, 3200);
});

const getContent = computed(() => {
    if (isLoad.value) {
        if (publication.value.description) {
            const result = publication.value?.description?.split(/\n/g);
            return result;
        }
    }
});

const turnTagsToArray = computed(() => {
    if (isLoad.value) {
        if(getContent.value){
            useSEO(publication.value.title, (getContent?.value[0]));    
        }
        const separateTags = publication.value?.tag?.split(' ');
        return separateTags.filter(tag => tag);
    }
});


</script>
<template>
    <main class="w-100 d-flex flex-column justify-content-center align-items-center overflow-hidden" style="min-height: 100vh;">
        <Spinner border-color="#09f" v-if="!isLoad" />
        <div v-if="serverError && isLoad" class="w-100 flex-column" :class="centerFlex">
            <p>Parece que hubo un error, vuelve atrás.</p>
            <RouterLink to="/publicaciones" class="btn btn-primary" style="min-width: 120px;">Volver</RouterLink>
        </div>
        <div :class="!serverError && isLoad ? centerFlex + ' d-flex flex-column overflow-hidden' : 'd-none'">
            <h1 class="mt-5 text-center w-75">{{ publication.title }}</h1>
            <div style="min-height: 450px;" class="w-100 overflow-hidden m-3 d-flex justify-content-center" ref="container">
                <canvas ref="canvasHTML"></canvas>
            </div>
            <div class="w-50 container-3d flex-column p-4" :class="centerFlex" >
                <div class="mt-4 w-100" style="min-height: 50vh;">
                    <ShowContent v-for="paragraph in getContent" :paragraph="paragraph" />
                </div>
                <div class="w-100 justify-content-between mt-5 flex-wrap" :class="centerFlex">
                    <RouterLink to="/publicaciones" class="btn px-4 btn-dark">Volver</RouterLink>
                    <div class="d-flex  gap-1 justify-content-end w-100">
                        <MetaTag v-for="tag in turnTagsToArray">{{ tag }}</MetaTag>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style>
@media (max-width:998px){
    .container-3d{
        width: 100% !important;
    }
}

</style>