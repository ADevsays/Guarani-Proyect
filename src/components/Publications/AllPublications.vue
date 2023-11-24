<script setup lang="ts">
import CardPublication from './CardPublication.vue';
import useGetAllPublications from '../../composables/useGetAllPublications.ts';
import {computed} from 'vue';
const {publications} = useGetAllPublications();
const emit = defineEmits(['openEdit']);
const getPublications = computed(()=>{
    if(publications.value.length > 0){
        return true;
    }
    return 'No se han encontrado publicaciones...';
});

const getImage = (image:any)=>{
    return image ?? '';
};


const turnTagsToArray = (publication: ObjectVirtual)=>{
    return publication.tag.split(' ');
};

const handleEditPublication=(value:boolean)=>{
    emit('openEdit', value);
}

</script>
<template>
    <div class="gap-4 m-3 d-flex justify-content-center flex-wrap align-items-start">
        <CardPublication
            @open-edit="handleEditPublication"
            v-if="getPublications == true" 
            v-for="publication in publications"
            :title="publication.title"
            :content="publication.description"
            :URL="publication.url"
            :place="publication.place"
            :id="String(publication.id)"
            :tags="turnTagsToArray(publication)"
            :image="getImage(publication.image)"
            :format="publication.format"/>
        <p v-else>{{getPublications}}</p>
    </div>
</template>