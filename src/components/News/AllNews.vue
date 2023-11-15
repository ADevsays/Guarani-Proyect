<script setup lang="ts">
import CardNews from './CardNews.vue';
import {computed} from 'vue';
import { getDescriptionTime } from '../../helpers/getDescriptionTime';
const props = defineProps<{
    news: NewData[]
}>();
const emit = defineEmits(['editNew']);

const newsToUse = computed(()=>{
    if(props.news.length >= 4){
        return props.news.slice(4);
    }
});

const editNew=(state:boolean)=>{
    emit('editNew', state)
}

</script>
<template>
    <div class="w-100 d-flex flex-column justify-content-center align-items-center">
        <h3 v-show="(newsToUse?.length as number) > 0" class="mt-5 fw-bold">Actualidad</h3>
        <div class="d-flex flex-wrap gap-4 mt-5 w-75 justify-content-center">
            <CardNews
                @edit-new="d=>editNew(d)"
                tag="Actualidad" 
                class-tag="text-primary" 
                v-for="newUser in newsToUse"
                :title="newUser.title" 
                :date="getDescriptionTime(newUser.start_date)"
                :url="newUser.url"
                :id="String(newUser.id)"
                />
        </div>
    </div>
</template>