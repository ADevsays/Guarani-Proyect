<script setup lang="ts">
import { getDescriptionTime } from '../../helpers/getDescriptionTime';
import {computed} from 'vue';
import CardNews from './CardNews.vue';
const props = defineProps<{
    featuredNews: NewData[]
}>();

const emit = defineEmits(['editNew']);

const newsToUse = computed(()=>{
    if(props.featuredNews.length >= 4){
        return props.featuredNews.slice(0,4);
    }
    return props.featuredNews;
});

const editNew=(state:boolean)=>{
    emit('editNew', state);
}

</script>
<template>
    <div class="bg-secondary-subtle p-5 rounded">
        <h2 class="mb-4">Últimas Noticias</h2>
        <div class="d-flex gap-3 flex-wrap justify-content-center">
            <CardNews 
                v-for="(newUser, i) in newsToUse"
                @edit-new="editNew"
                :tag="i == 2 ? 'Anuncio' : 'Reciente'" 
                :is-featured="true" 
                :class-tag="i == 2 ? 'text-success' : 'text-danger'"
                :title="newUser.title"
                :url="newUser.url"
                :id="String(newUser.id)"
                :date="getDescriptionTime(newUser.start_date)"
                :content="newUser.description"/>
        </div>
    </div>
</template>