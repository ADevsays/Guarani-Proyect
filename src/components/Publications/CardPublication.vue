<script setup lang="ts">
import MetaTag from './MetaTag.vue';
import PlaceholderImg from '../../imgs/Imagen_Placeholder.webp';
import { maxLengthContentCardText } from '../../consts/maxLengthContentCardText.ts';
import { computed, onMounted,ref } from 'vue';
import loadImg from '../../helpers/loadImg.ts';
import useGetUser from '../../composables/useGetUser.ts';
import PencilIcon from '../SVG/PencilIcon.vue';
import { centerFlex } from '../../consts/communClasses';

const props = defineProps<{
    id: string,
    title: string,
    content: string,
    img: string,
    tags: string[],
    place: string
}>();

const {user} = useGetUser();
const emit = defineEmits(['openEdit']);
const isLoad = ref(false);

onMounted(()=>{
    isLoad.value = false;
    if(props.img){
        loadImg(props.img)
        .then(()=> isLoad.value = true);
    }
});

const getContent = computed(() => {
    if (props.content.length > maxLengthContentCardText) {
        return props.content.substring(0, maxLengthContentCardText) + '...';
    }
    return props.content;
});

const getTitle = computed(() => {
    return props.title ? props.title : 'No hay título';
});

const getPlace = computed(() => {
    return props.place ? props.place : 'No hay sitio';
});

const getImg = computed(() => {
    if(!props.img) return PlaceholderImg;
    if(isLoad.value) return props.img;
    return PlaceholderImg;
});

const getTags= computed(()=>{
    return props.tags.filter(tag=>tag);
});

const handleEditPublication = () => {
    emit('openEdit', {content:'edit', value:true, id:props.id});
}

const checkRolUser = computed(()=>{
    if(user.value){
        return user.value.rol == 'admin' || user.value.rol == 'editor';
    }
});

</script>
<template>
    <div class="position-relative h-100 p-0 mb-3">
        <span v-if="checkRolUser" @click="handleEditPublication" :class="centerFlex" class="position-absolute p-1 rounded edit-button">
            <PencilIcon/>
        </span>
        <RouterLink class="nav-link" :to="`/publicaciones/${props.id}`">
            <div class="card text-start  hover-event-cards hover-event-card" style="width: 18rem;">
                <img class="rounded-top object-fit-cover" style="max-height: 160px;" :alt="props.title" :src="getImg">
                <div class="card-body position-relative" style="min-height: 240px;">
                    <h5 class="card-title m-0">{{ getTitle }}</h5>
                    <p style="font-size: .8em;" class="p-0 m-0 text-secondary">{{ getPlace }}</p>
                    <p class="card-text fw-normal mt-2" style="font-size: .9em; min-height: 90px;">
                        {{ getContent }}
                    </p>
                    <div class="d-flex position-absolute gap-1" style="bottom: 8px; right: 8px;">
                        <MetaTag v-for="tag in getTags">{{ tag }}</MetaTag>
                    </div>
                </div>
            </div>
        </RouterLink>
    </div>
</template>

<style scoped>
.edit-button{
    cursor: pointer;
    z-index: 7;
    top: 5px;
    right: 6px;
    background-color: rgba(0, 0, 0, 0.3);
}
</style>