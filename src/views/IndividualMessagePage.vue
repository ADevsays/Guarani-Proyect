<script setup lang="ts">
import {onMounted, ref, computed} from 'vue';
import { centerFlex } from '../consts/communClasses';
import ShowContent from '../components/Publications/ShowContent.vue';
import router from '../router';
import Spinner from '../components/Spinner.vue';
import { useRoute } from 'vue-router';
import useSEO from '../helpers/useSEO';
import { useContacts } from '../store/useContact';

const route = useRoute();
const contactStore = useContacts();
const isLoadContent = ref(false);
const individualMessage = ref({} as Contact);

onMounted(()=>{
    const id = route.params.id;
    if(!(route || id)) return;
    individualMessage.value = contactStore.getOneContact(id as string);
    isLoadContent.value = true;
});

const getContent = computed(() => {
    if (individualMessage.value) {
        const result = individualMessage.value?.message?.split(/\n/g);
        useSEO(individualMessage.value.title, result[0]);    
        return result;
    }
    return ['Cargando...']
});

const getWeb = computed(() => {
    if (!individualMessage.value) 
        return ['Cargando...']  
    const web = individualMessage.value.web;
    return web ? web : 'No se agregó';
});

const backRoute = () => {
    router.go(-1);
}
</script>
<template>
    <main :class="centerFlex" class="w-100 p-5 flex-column content-individual-publication" style="min-height: 100vh;">
        <Spinner border-color="#09f" v-if="!isLoadContent" />
        <template v-else>
            <h1 class="m-3 text-center">{{ individualMessage.matter }}</h1>
            <div class="mt-4 w-100" style="min-height: 50vh;">
                <ShowContent v-for="paragraph in getContent" :paragraph="paragraph" />
            </div>
            <div class="d-flex flex-column gap-2">
                <p class="m-0 fw-bold ">
                    -{{individualMessage.name}}
                </p>
                <p class="m-0">
                    Email: {{ individualMessage.email }}
                </p>
                <p class="m-0">
                    Sitio Web: {{ getWeb }}
                </p>
            </div>
            <div class="w-100 justify-content-between mt-5 flex-wrap" :class="centerFlex">
                <button class="btn px-4 btn-dark" @click="backRoute">Volver</button>
            </div>
        </template>
    </main>
</template>