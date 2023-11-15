<script setup lang="ts">
import FormUploadHistory from '../components/Histories/FormUploadHistory.vue'
import AllHistories from '../components/Histories/AllHistories.vue'
import TitlePage from '../components/TitlePage.vue';
import {ref, onMounted, watch} from 'vue';
import { centerFlex } from '../consts/communClasses';
import Spinner from '../components/Spinner.vue';
import useModalForm from '../composables/useModalForm.ts';
import {getAllHistories} from '../server/services/Histories/getAllHistories.ts';
import { useAllHistories } from '../store/useAllHistories';

const historiesStore = useAllHistories();
const loadHistories = ref(false);
const serverError = ref(false);
const histories = ref<History[]>([]);

const {checkIfIsAdmin, 
        openModal,
        editID,
        closeModalFn, 
        openModalFn, 
        editModal} = useModalForm();

onMounted(async ()=>{
    const result = await getAllHistories();
    if(!result){
        serverError.value = true;
        loadHistories.value = true;
        return;
    }
    const allHistories = await result.json();
    historiesStore.setHistories(allHistories);
    histories.value = allHistories.reverse();
    loadHistories.value = true;
});

watch(
    () => historiesStore.histories,
    () => histories.value = historiesStore.getHistories()
);

</script>
<template>
    <main class="p-5 h-100" style="min-height: 100vh;">
        <TitlePage title="Las historias de nuestra comunidad..." text="Porque todos tenemos algo que contar."/>
        <FormUploadHistory v-if="openModal.state" @close-modal="closeModalFn" :id="editID" :type="openModal.content" />
        <div :class="centerFlex" class="flex-column">
            <button v-if="checkIfIsAdmin" @click="openModalFn({ content: 'upload', value: true })"
                class="w-50 btn btn-primary m-3">Subir noticia</button>
            <Spinner border-color="#09f" v-if="!loadHistories" />
            <div v-else>
                <p v-show="serverError">Parece que hubo algún <span class="text-danger">problema</span> con el servidor, no
                    se han podido recuperar las historias</p>
                <div v-if="histories.length <= 0" class="text-center mt-4">
                    No se han encontrado <span class="text-danger">historias.</span>
                </div>
                <template v-if="histories.length > 0">
                    <AllHistories @edit-new="editModal" :histories="histories" />
                </template>
            </div>
        </div>
    </main>
</template>


