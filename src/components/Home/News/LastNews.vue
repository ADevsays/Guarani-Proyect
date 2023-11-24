<script setup lang="ts">
import useGetAllNews from '../../../composables/useGetAllNews';
import { useAllNews } from '../../../store/useAllNews';
import { useSearch } from '../../../store/useSearch';
import NewsSlider from './NewsSlider.vue';
import {onMounted, ref} from 'vue';

const newsStore = useAllNews();
const searchStore = useSearch();
const news = ref([] as NewData[]);

onMounted(async () => {
    const result = await useGetAllNews();
    if (!result) return;
    const newsUser = newsStore.getNews().reverse();
    searchStore.setAllSearch(newsUser, 'news');
    news.value = newsUser;
});
</script>

<template>
    <div class="w-100 d-flex flex-column justify-content-center align-items-center mt-5">
        <h3 style="font-size: 2.5em;" class="fw-bold text-center">Qué está pasando...</h3>
        <p style="min-height: 180px;" v-if="news.length <= 0">No hay noticias que mostrar...</p>
        <NewsSlider v-else/>
        <RouterLink class="btn btn-light m-3 border border-black" to="/noticias">Todas las noticias</RouterLink>
    </div>
</template>
