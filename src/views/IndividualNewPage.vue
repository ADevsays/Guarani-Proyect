<script setup lang="ts">
import {useRoute} from 'vue-router';
import {onMounted, ref, computed} from 'vue';
import {getOneNew} from  '../server/services/News/getOneNew.ts';
import { centerFlex } from '../consts/communClasses';import ShowContent from '../components/Publications/ShowContent.vue';
import PlaceholderImg from '.././imgs/Imagen_Placeholder.webp';
import useSEO from '../helpers/useSEO';
import loadImg from '../helpers/loadImg';
import router from '../router';
import Spinner from '../components/Spinner.vue';

const route = useRoute();
const userNew = ref({} as NewData);
const isLoadContent = ref(false);
const isLoadImg = ref(false);

onMounted(async ()=>{
    const result = await getOneNew(String(route.params.id));
    if(!result) return;
    const individualNew = await result.json();
    userNew.value = individualNew;
    isLoadContent.value = true;
    if (!userNew.value.url) return;
    if (!getContent.value) return;
    useSEO(userNew.value.title, getContent?.value[0]);
    loadImg(userNew.value.url)
        .then(() => isLoadImg.value = true);
});

const getImg = computed(() => {
    if (!userNew.value.url) return PlaceholderImg;
    if (isLoadImg.value) return userNew.value.url;
    return PlaceholderImg;
});

const getContent = computed(() => {
    if (userNew.value.description) {
        const result = userNew.value?.description?.split(/\n/g);
        return result;
    }
});


const backRoute = () => {
    router.go(-1);
}
</script>
<template>
    <main :class="centerFlex" class="w-100 p-5 flex-column content-individual-publication" style="min-height: 100vh;">
        <Spinner border-color="#09f" v-if="!isLoadContent" />
        <template v-else>
            <h1 class="m-3 text-center">{{ userNew.title }}</h1>
            <div class="w-100 m-3">
                <img class="w-100 h-100 object-fit-contain" :src="getImg" :alt="userNew.title"
                    style="min-height: 300px;">
            </div>
            <div class="mt-4 w-100" style="min-height: 50vh;">
                <ShowContent v-for="paragraph in getContent" :paragraph="paragraph" />
            </div>
            <div class="w-100 justify-content-between mt-5 flex-wrap" :class="centerFlex">
                <button class="btn px-4 btn-dark" @click="backRoute">Volver</button>
            </div>
        </template>
    </main>
</template>