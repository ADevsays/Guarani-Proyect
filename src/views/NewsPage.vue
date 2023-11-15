<script setup lang="ts">
import TitlePage from '../components/TitlePage.vue';
import FeaturedBanner from '../components/News/FeaturedBanner.vue';
import FormUploadNew from '../components/News/FormUploadNew.vue';
import { centerFlex } from '../consts/communClasses';
import { ref, onMounted, watch } from 'vue';
import Spinner from '../components/Spinner.vue';
import AllNews from '../components/News/AllNews.vue';
import { useAllNews } from '../store/useAllNews';
import useGetAllNews from '../composables/useGetAllNews.ts';
import useModalForm from '../composables/useModalForm';

const newsStore = useAllNews();
const loadNews = ref(false);
const serverError = ref(false);
const news = ref<NewData[]>([]);

const {checkIfIsAdmin, 
        openModal,
        editID,
        closeModalFn, 
        openModalFn, 
        editModal} = useModalForm();

onMounted(async () => {
    const result = await useGetAllNews();
    if (!result) {
        serverError.value = true;
        loadNews.value = true;
        return;
    }
    const newsUser = newsStore.getNews().reverse();
    news.value = newsUser;
    loadNews.value = true;
});

watch(
    () => newsStore.news,
    () => news.value = newsStore.getNews()
);

</script>

<template>
    <main class="p-5 h-100" style="min-height: 100vh;">
        <TitlePage title="Lo último que está pasando en la cultura Guaraní" text="Mira aquí las últimas noticias..." />
        <FormUploadNew v-if="openModal.state" @close-modal="closeModalFn" :id="editID" :type="openModal.content" />
        <div :class="centerFlex" class="flex-column">
            <button v-if="checkIfIsAdmin" @click="openModalFn({ content: 'upload', value: true })"
                class="w-50 btn btn-primary m-3">Subir noticia</button>
            <Spinner border-color="#09f" v-if="!loadNews" />
            <div v-else>
                <p v-show="serverError">Parece que hubo algún <span class="text-danger">problema</span> con el servidor, no
                    se han podido recuperar las noticias</p>
                <div v-if="news.length <= 0" class="text-center mt-4">
                    No se han encontrado <span class="text-danger">noticias.</span>
                </div>
                <template v-if="news.length > 0">
                    <div class="d-flex mt-5 justify-content-center align-items-center w-100">
                        <FeaturedBanner @edit-new="editModal" :featured-news="news" />
                    </div>
                    <AllNews @edit-new="editModal" :news="news" />
                </template>
            </div>
        </div>
    </main>
</template>