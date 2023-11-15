<script setup lang="ts">
import MetaTag from './MetaTag.vue';
import PlaceholderImg from '../../imgs/Imagen_Placeholder.webp';
import { maxLengthContentCardText } from '../../consts/maxLengthContentCardText.ts';
import { computed, onMounted, ref } from 'vue';
import loadImg from '../../helpers/loadImg.ts';
import useGetUser from '../../composables/useGetUser.ts';
import ButtonOptions from './ButtonOptions.vue';
import { usePublications } from '../../store/usePublications.ts';
import { deleteObjectVirtual } from '../../server/services/ObjectVirtual/deleteObjectVirtual.ts';
import { getToken } from '../../helpers/saveToken';
import { tokenName } from '../../consts/userToken';
import { delete3dObject } from '../../server/services/ObjectVirtual/delete3dObject.ts';
import typesformPublication from '../../consts/typesFormPublication.ts';

const props = defineProps<{
    id: string,
    title: string,
    content: string,
    URL: string,
    tags: string[],
    place: string,
    image?: string
}>();

const publicationsStore = usePublications();
const token = getToken(tokenName);
const { user } = useGetUser();
const emit = defineEmits(['openEdit']);
const isLoad = ref(false);

onMounted(() => {
    isLoad.value = false;
    if (props.URL) {
        loadImg(props.URL)
            .then(() => isLoad.value = true);
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

const getURL = computed(() => {
    if (!props.URL) return PlaceholderImg;
    if (isLoad.value) return props.URL;
    return PlaceholderImg;
});

const getTags = computed(() => {
    return props.tags.filter(tag => tag);
});

const getPath = computed(() => {
    if (props.image) {
        return `/imagen3d/${props.id}`
    }
    return `/publicaciones/${props.id}`
});

const checkRolUser = computed(() => {
    if (user.value) {
        return user.value.rol == 'admin'
            || user.value.rol == 'editor';
    }
});

const handleEditPublication = () => {
    if (!props.image)
        emit('openEdit', { content: typesformPublication.EDIT, value: true, id: props.id });
    if (props.image)
        emit('openEdit', { content: typesformPublication.EDIT_VR, value: true, id: props.id });
};

const typeOfDelete = async (is3d: string | undefined) => {
    if (is3d) {
        return await delete3dObject(token as string, props.id);
    }
    return await deleteObjectVirtual(token as string, props.id);
}

const deletePublication = async () => {
    const confirmDelete = confirm('¿Está seguro de que desea eliminar esta publicación? ¡Esto no se puede deshacer!');
    if (!confirmDelete) return;
    try {
        if (!token) return;
        if (!props.id) return;
        const result = await typeOfDelete(props.image);
        const deletePublication = await result?.json();
        if (deletePublication.message) {
            publicationsStore.deletePublication(props.id);
        }
    } catch (error) {
        console.error(error);
    }
};

</script>
<template>
    <div class="position-relative h-100 p-0 mb-3">
        <ButtonOptions :check-rol-user="checkRolUser" @edit-publication="handleEditPublication"
            @delete-publication="deletePublication" />
        <RouterLink class="nav-link" :to="getPath">
            <div class="card text-start  hover-event-cards hover-event-card" style="width: 18rem;">
                <img class="user-select-none rounded-top object-fit-cover" style="max-height: 160px; object-position: top;" :alt="props.title"
                    :src="getURL">
                <div class="card-body position-relative" style="min-height: 240px;">
                    <h5 class="card-title m-0">{{ getTitle }}
                    </h5>
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

<style>
.edit-button {
    cursor: pointer;
    z-index: 7;
    top: 5px;
    right: 6px;
    background-color: rgba(0, 0, 0, 0.3);
}
</style>