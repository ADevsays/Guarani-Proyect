<script setup lang="ts">
import {onMounted, ref, computed} from 'vue';
import { centerFlex } from '../consts/communClasses';import ShowContent from '../components/Publications/ShowContent.vue';
import PlaceholderImg from '.././imgs/Imagen_Placeholder.webp';
import loadImg from '../helpers/loadImg';
import router from '../router';
import Spinner from '../components/Spinner.vue';
import { useAllHistories } from '../store/useAllHistories';
import { useRoute } from 'vue-router';
import MetaTag from '../components/Publications/MetaTag.vue';
import useSEO from '../helpers/useSEO';

const route = useRoute();
const historiesStore = useAllHistories();
const isLoadContent = ref(false);
const isLoadImg = ref(false);
const individualHistory = ref({} as History);

onMounted(()=>{
    const id = route.params.id;
    if(!(route || id)) return;
    individualHistory.value = historiesStore.getOneHistory(id as string);
    console.log(individualHistory.value)
    loadImg(individualHistory.value.url)
        .then(() => isLoadImg.value = true);
    isLoadContent.value = true;
});

const getImg = computed(() => {
    if (!individualHistory.value.url) return PlaceholderImg;
    if (isLoadImg.value) return individualHistory.value.url;
    return PlaceholderImg;
});

const getContent = computed(() => {
    if (individualHistory.value.description) {
        const result = individualHistory.value?.description?.split(/\n/g);
        useSEO(individualHistory.value.title, result[0]);    
        return result;
    }
});

const turnTagsToArray = (tag:string)=>{
    return tag.split(' ');
};

const backRoute = () => {
    router.go(-1);
}
</script>
<template>
    <main :class="centerFlex" class="w-100 p-5 flex-column content-individual-publication" style="min-height: 100vh;">
        <Spinner border-color="#09f" v-if="!isLoadContent" />
        <template v-else>
            <h1 class="m-3 text-center">{{ individualHistory.title }}</h1>
            <div class="w-100 m-3">
                <img class="w-100 h-100 object-fit-contain" :src="getImg" :alt="individualHistory.title"
                    style="min-height: 300px;">
            </div>
            <div class="mt-4 w-100" style="min-height: 50vh;">
                <ShowContent v-for="paragraph in getContent" :paragraph="paragraph" />
            </div>
            <div class="w-100 justify-content-between mt-5 flex-wrap" :class="centerFlex">
                <button class="btn px-4 btn-dark" @click="backRoute">Volver</button>
                <div class="d-flex  gap-1 justify-content-end w-100">
                    <MetaTag v-for="tag in turnTagsToArray(individualHistory.tag)">{{ tag }}</MetaTag>
                </div>
            </div>
        </template>
    </main>
</template>