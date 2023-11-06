<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { ref, computed } from 'vue';
import { getObjectVirtual } from '../server/services/ObjectVirtual/getObjectVirtuals.ts';
import { centerFlex } from '../consts/communClasses';
import PlaceholderImg from '../imgs/Imagen_Placeholder.webp';
import AllComments from '../components/Comments/AllComments.vue';
import ShowContent from '../components/Publications/ShowContent.vue';
import MetaTag from '../components/Publications/MetaTag.vue';
import loadImg from '../helpers/loadImg';
import useGetAllUsers from '../composables/useGetAllUsers';
import { useComments } from '../store/useComments';

const commentsStore = useComments();
const route = useRoute();
const router = useRouter();
const publication = ref({} as ObjectVirtual);
const isLoad = ref(false);
const comments = ref([] as Comment[]);
const {getUsers} = useGetAllUsers();

onMounted(async () => {
    const result = await getObjectVirtual(route.params.id)
    if (result) {
        const publi = await result.json();
        publication.value = publi.digital_object;
        commentsStore.setComments(publi.comments);
        comments.value = commentsStore.getComments()
    }
    isLoad.value = false;
    if (publication.value.url) {
        loadImg(publication.value.url)
            .then(() => isLoad.value = true);
    }
    getUsers();
});

const getImg = computed(() => {
    if (!publication.value.url) return PlaceholderImg;
    if (isLoad.value) return publication.value.url;
    return PlaceholderImg;
});

const getContent = computed(() => {
    if (publication.value.description) {
        const result = publication.value?.description?.split(/\n/g);
        return result;
    }
});

const turnTagsToArray = computed(() => {
    return publication.value?.tag?.split(' ');
});

const backRoute = () => {
    router.go(-1);
}

</script>
<template>
    <main :class="centerFlex" class="w-100 p-5 flex-column content-individual-publication" style="min-height: 100vh;">
        <h1 class="m-3 text-center">{{ publication.title }}</h1>
        <div class="w-100 m-3">
            <img class="w-100 h-100 object-fit-contain" :src="getImg" :alt="publication.title" style="min-height: 300px;">
        </div>
        <div class="mt-4 w-100" style="min-height: 50vh;">
            <ShowContent v-for="paragraph in getContent" :paragraph="paragraph" />
        </div>
        <div class="w-100 justify-content-between mt-5 flex-wrap" :class="centerFlex">
            <button class="btn px-4 btn-dark" @click="backRoute">Volver</button>
            <div class="d-flex  gap-1 justify-content-end w-100">
                <MetaTag v-for="tag in turnTagsToArray">{{ tag }}</MetaTag>
            </div>
        </div>
        <AllComments :comments="comments"/>
    </main>
</template>