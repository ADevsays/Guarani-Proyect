<script setup lang="ts">
import TitlePage from '../components/TitlePage.vue';
import { onMounted } from 'vue';
import {getAllSuggestions} from '../server/services/Suggestions/getAllSuggestions.ts';
import FormReports from '../components/Reports/FormReports.vue';
import { useSuggestions } from '../store/useSuggestions';
import AllReports from '../components/Reports/AllReports.vue';
import { centerFlex } from '../consts/communClasses';

const suggestionStore = useSuggestions();

const setAllSuggestions = async()=>{
    try {
        const result = await getAllSuggestions();
        console.log(result)
        if(!result) throw new Error('Hubo un error');
        const messages = await result.json();
        suggestionStore.setSuggestions(messages)
    } catch (error) {
        console.error(error);
    }
};

onMounted(()=>{
    setAllSuggestions();
});

</script>
<template>
    <main class="p-5 h-100 w-100 overflow-hidden position-relative flex-column" :class="centerFlex" style="min-height: 100vh; background-color: rgb(249, 249, 249);">
        <TitlePage title="Ayúdanos a mejorar" text="Dinos si algo ha fallado..." />
        <br>
        <FormReports/>
        <h4 class="my-3">Algunos aportes de la comunidad:</h4>
        <AllReports :reports="suggestionStore.getSuggestions()"/>
    </main>
</template>

<style scoped>
body{
    background-color:rgb(249, 249, 249);;
}
</style>