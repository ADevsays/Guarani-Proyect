<script setup lang="ts">
import BookIcon from '../../SVG/BookIcon.vue';
import { computed, onMounted, ref } from 'vue';
import PlaceholderImg from '../../../imgs/Imagen_Placeholder.webp';
import loadImg from '../../../helpers/loadImg';
import MetaTag from '../../Publications/MetaTag.vue';
import ButtonOptions from '../../Publications/ButtonOptions.vue';
import useGetUser from '../../../composables/useGetUser';
import typesFormPublication from '../../../consts/typesFormPublication';
import { getToken } from '../../../helpers/saveToken';
import { tokenName } from '../../../consts/userToken';
import {deleteHistory} from '../../../server/services/Histories/deleteHistory.ts';
import { useAllHistories } from '../../../store/useAllHistories';
const props = defineProps<{
    isPage?: boolean,
    content: string,
    title: string,
    date: string,
    tags: string[],
    url: string,
    id: string
}>();

const imgState = ref(false);
const { user } = useGetUser();
const emit = defineEmits(['editNew']);
const token = getToken(tokenName);

const historiesStore = useAllHistories();

onMounted(() => {
    imgState.value = false;
    if (props.url) {
        loadImg(props.url)
            .then(() => imgState.value = true);
    }
});

const getImg = computed(() => {
    if (!props.url) return PlaceholderImg;
    if (imgState.value) return props.url;
    return PlaceholderImg;
});

const getContent = computed(() => {
    if (props.content) {
        if (props.content.length > 15) {
            return props.content.substring(0, 15) + '...';
        };
        return props.content;
    }
});

const getTags = computed(() => {
    return props.tags.filter(tag => tag);
});

const checkRolUser = computed(() => {
    if (user.value) {
        return user.value.rol == 'admin'
            || user.value.rol == 'editor';
    }
});

const handleEditHistory=()=>{
    emit('editNew', {content:typesFormPublication.EDIT_VR, value:true, id:props.id});
};
const deleteHistoryFn = async () => {
    const userConfirm = confirm('¿Está seguro de que desea eliminar esta noticia? Esta acción NO se puede deshacer.')
    if(!userConfirm) return;
    try {
        console.log(props.id)
        if(!token) return;
        if(!props.id) return;
        const result = await deleteHistory(token, props.id);
        if(!result) throw new Error('No se ha podido eliminar');
        const deleteHistoryVal = await result.json();
        if(deleteHistoryVal){
            historiesStore.deleteHistory(props.id);
        }
    } catch (error) {
        console.error(error);
    }
}
</script>
<template>
    <div class="position-relative">
        <ButtonOptions :check-rol-user="checkRolUser" @edit-publication="handleEditHistory"
            @delete-publication="deleteHistoryFn" />
        <RouterLink :to="`/historias/${props.id}`"
            class="d-flex nav-link position-relative">
            <div :style="{ 'max-width': !props.isPage ? '380px' : '500px' }"
                class="rounded-3 w-100 shadow-sm position-relative">
                <div>
                    <img style="max-height: 500px;" 
                    class="h-100 w-100 rounded-top-2 object-fit-cover" 
                    :src="getImg" 
                    :alt="props.title"
                    :style="{ 'min-height': !props.isPage ? '280px' : '350px' }"
                    >
                </div>
                <div class="p-3 pb-5">
                    <h4 class="fw-bold text-primary">
                        {{ props.title }}
                    </h4>
                    <p> 
                        <span>
                            <BookIcon />
                        </span> 
                            {{ getContent }}
                    </p>
                </div>
                <span class="position-absolute text-secondary"
                    style="min-width: 50px; left: 10px; bottom: 5px; font-size: 0.85em;">
                    {{ props.date }}
                </span>
                <div class="d-flex position-absolute gap-1" style="bottom: 8px; right: 8px;">
                    <MetaTag v-for="tag in getTags">{{ tag }}</MetaTag>
                </div>
            </div>
        </RouterLink>
    </div>
</template>