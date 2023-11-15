<script setup lang=ts>
import { useRoute } from 'vue-router';
import TitlePage from '../components/TitlePage.vue';
import {onMounted, ref} from 'vue';
import {useSearch} from '../store/useSearch.ts';
import SearchResult from '../components/Search/SearchResult.vue';

const location = useRoute();
const searchStore = useSearch();
const searchResult = ref<SearchData[]>([]);
onMounted(()=>{
    const {params} = location;
    const result = searchStore.searchByQuery(params.id as string);
    searchResult.value = result as any;
});

</script>
<template>
    <main class="p-5 h-100" style="min-height: 100vh;">
        <TitlePage title="Los resultados de tu búsqueda..." text="Buscando en toda nuestra base de datos..." />
        <SearchResult v-for="search in searchResult" :search="(search as any)"/>
    </main>
</template>