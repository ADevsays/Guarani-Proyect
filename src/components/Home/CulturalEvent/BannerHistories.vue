<script setup lang="ts">
import { getDescriptionTime } from '../../../helpers/getDescriptionTime';
import { getAllHistories } from '../../../server/services/Histories/getAllHistories';
import { useAllHistories } from '../../../store/useAllHistories';
import { useSearch } from '../../../store/useSearch';
import HistoriesCard from './HistoriesCard.vue';
import {ref, onMounted} from 'vue';

const histories = ref<History[]>([]);
const historiesStore = useAllHistories();
const searchStore = useSearch();


onMounted(async ()=>{
    const result = await getAllHistories();
    if(!result) return; 
    const allHistories = await result.json();
    historiesStore.setHistories(allHistories);
    searchStore.setAllSearch(allHistories, 'histories');
    histories.value = allHistories.reverse().slice(0,2);
});

const turnTagsToArray = (tag:string)=>{
    return tag.split(' ');
};


</script>
<template>
    <h3 style="font-size: 2.5em;" class="fw-bold text-center mt-5">Historias</h3>
    <div class="d-flex w-100 flex-wrap justify-content-center p-5 gap-5">
        <HistoriesCard 
                v-for="history in histories"
                :title="history.title" 
                :date="getDescriptionTime(history.start_date)"
                :url="history.url"
                :id="String(history.id)"
                :content="history.description"
                :tags="turnTagsToArray(history.tag)"
                :is-page="true"
            />
    </div> 
</template>