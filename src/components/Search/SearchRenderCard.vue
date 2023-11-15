<script setup lang="ts">
import CardNews from '../News/CardNews.vue';
import CardPublication from '../Publications/CardPublication.vue';
import { getDescriptionTime } from '../../helpers/getDescriptionTime';
import HistoriesCard from '../Home/CulturalEvent/HistoriesCard.vue';
import CardProduct from '../Home/Products/CardProduct.vue';
import possibleSubtitlesSearch from '../../consts/possibleSubtitlesSearch';

const props = defineProps<{
    type:string,
    arrayToUse: any[]
}>()

const getImage = (image:any)=>{
    if(image)
    return image ?? '';
};

const turnTagsToArray = (publication: ObjectVirtual)=>{
    if(publication)
    return publication.tag.split(' ');
};

const showCard =(type:any)=>{
    return props.type == type;
}
</script>
<template>
   <CardPublication
            v-if="showCard(possibleSubtitlesSearch.publications)"
            v-for="publication in arrayToUse"
            :title="publication.title"
            :content="publication.description"
            :URL="publication.url"
            :place="publication.place"
            :id="String(publication.id)"
            :tags="(turnTagsToArray(publication) as string[])"
            :image="getImage(publication.image)"/>
    <CardNews
            v-if="showCard(possibleSubtitlesSearch.news)"    
            tag="Busqueda" 
            class-tag="text-primary" 
            v-for="newUser in arrayToUse"
            :title="newUser.title" 
            :date="getDescriptionTime(newUser.start_date)"
            :url="newUser.url"
            :id="String(newUser.id)"
            />
    <HistoriesCard
            v-if="showCard(possibleSubtitlesSearch.histories)"    
            v-for="history in arrayToUse"
            :title="history.title" 
            :date="getDescriptionTime(history.start_date)"
            :url="history.url"
            :id="String(history.id)"
            :content="history.description"
            :tags="(turnTagsToArray(history) as string[])"
            />
    <CardProduct 
            v-if="showCard(possibleSubtitlesSearch.products)" 
            v-for="product in arrayToUse" 
            :product="product"/>
           
</template>