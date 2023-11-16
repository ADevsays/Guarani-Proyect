<script setup lang=ts>
import { onMounted, ref, computed } from 'vue';
import loadImg from '../../helpers/loadImg';
import PlaceholderImg from '../../imgs/Imagen_Placeholder.webp';
import useGetUser from '../../composables/useGetUser';
import ButtonOptions from '../Publications/ButtonOptions.vue';
import { useAllNews } from '../../store/useAllNews';
import { getToken } from '../../helpers/saveToken';
import { tokenName } from '../../consts/userToken';
import { deleteNew } from '../../server/services/News/deleteNew';
const props = defineProps({
    tag: String,
    classTag: String,
    isFeatured: {
        type: Boolean, default: false
    },
    id: String,
    title: String,
    content: {
        type: String, requiered: false
    },
    date: String,
    url: String
});
const token = getToken(tokenName);
const newsStore = useAllNews();
const imgState = ref(false);
const {user} = useGetUser();
const emit = defineEmits(['editNew']);
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
        if (props.content.length > 85) {
            return props.content.substring(0, 85) + '...';
        };
        return props.content;
    }
});

const checkRolUser = computed(()=>{
    if(user.value){
        return user.value.rol == 'admin' 
              || user.value.rol == 'editor';
    }
});

const handleEditNew=()=>{
    emit('editNew', {content:'edit', value:true, id:props.id});
};

const deleteNewFn= async ()=>{
    const userConfirm = confirm('¿Está seguro de que desea eliminar esta noticia? Esta acción NO se puede deshacer.')
    if(!userConfirm) return;
    try {
        if(!token) return;
        if(!props.id) return;
        const result = await deleteNew(token, props.id);
        if(!result) throw new Error('No se ha podido eliminar');
        const deleteUserNew = await result.json();
        if(deleteUserNew){
            newsStore.deleteNew(props.id);
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <div class="h-100 position-relative p-0 mb-3">
        <ButtonOptions
            :check-rol-user="checkRolUser"
            @edit-publication="handleEditNew"
            @delete-publication="deleteNewFn"
        />
        <RouterLink :to="`/noticias/${props.id}`" class="nav-link hover-event-card text-start">
            <div style="width: 280px; height: auto;" :class="{ 'shadow': !props.isFeatured }">
                <div>
                    <img class="w-100 h-100 rounded-top-2 object-fit-cover" style="min-height: 180px;" :src="getImg"
                        :alt="props.title">
                </div>
                <div :style="{ 'min-height': props.isFeatured ? '215px' : '140px' }"
                    class="bg-white text-black position-relative p-2 pb-5 rounded-bottom-3">
                    <span class="d-block py-2" :class="props.classTag">
                        {{ props.tag }}
                    </span>
                    <h5 class="fw-medium ">
                        {{ props.title }}
                    </h5>
                    <p v-show="props.isFeatured" style="font-size:15px">
                        {{ getContent }}
                    </p>
                    <hr class="w-100 p-0 m-0">
                    <span class="w-100 d-block position-absolute text-secondary"
                        style="font-size:12px; bottom: 10px; left: 8px;">{{ props.date }}</span>
                </div>
            </div>
        </RouterLink>
    </div>
</template>

<style>
.hover-event-card {
    transition: box-shadow .2s ease;
}

.hover-event-card:hover {
    box-shadow: -5px 1px 30px -8px rgba(0, 0, 0, 0.75);
}
</style>