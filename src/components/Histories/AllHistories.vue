<script setup lang="ts">
import {computed} from 'vue';
import HistoriesCard from '../Home/CulturalEvent/HistoriesCard.vue';
import { getDescriptionTime } from '../../helpers/getDescriptionTime';

const props = defineProps<{
    histories: History[]
}>();
const emit = defineEmits(['editNew']);

const historiesToUse = computed(()=>{
    if(props.histories.length >= 4){
        return props.histories.slice(4);
    }
});

const turnTagsToArray = (tag:string)=>{
    return tag.split(' ');
};

const editNew=(state:any)=>{
    emit('editNew', state)
};

</script>
<template>
    <div class="w-100 d-flex flex-column justify-content-center align-items-center">
        <h3 v-show="(historiesToUse?.length as number) > 0" class="mt-5 fw-bold">Actualidad</h3>
        <div class="d-flex flex-wrap gap-5 mt-5 w-100 justify-content-center">
            <HistoriesCard
                @edit-new="d=>editNew(d)" 
                v-for="history in histories"
                :title="history.title" 
                :date="getDescriptionTime(history.start_date)"
                :url="history.url"
                :id="String(history.id)"
                :content="history.description"
                :tags="turnTagsToArray(history.tag)"
                />
        </div>
    </div>
</template>