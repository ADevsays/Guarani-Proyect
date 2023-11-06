<script setup lang="ts">
import useGetUser from '../../composables/useGetUser';
import { tokenName } from '../../consts/userToken';
import { getToken } from '../../helpers/saveToken';
import TrashIcon from '../SVG/TrashIcon.vue';
import {deleteComment} from '../../server/services/Comments/deleteComment.ts';
import {useComments} from '../../store/useComments.ts';

const props = defineProps<{
    name:string, 
    date: string, 
    content:string,
    id:string
}>();
const {user} = useGetUser();
const token = getToken(tokenName);
const commentsStore = useComments();

const getUserRol = ()=>{
    if(user.value){
        return user.value.rol == 'admin';
    }
}

const deleteCommentFn= async()=>{
    const confirmDelete = confirm('¿Estás seguro de querer eliminar este comentario?');
    if(!confirmDelete) return;
    try {
        if(!token) return;
        const result = await deleteComment(token, props.id);
        if(!result) return;
        commentsStore.deleteComment(props.id);
    } catch (error) {
        console.error(error);
    }
}

</script>

<template>
    <div class="d-flex flex-column bg-white shadow p-2 pb-3 rounded-1 w-100 comment mb-2 position-relative">
        <div class="comment d-flex w-100 justify-content-between align-items-center">
            <span class="fw-medium text-primary">{{props.name}}</span>
            <span style="font-size: .7em;" class="text-secondary fw-medium">{{props.date}}</span>
        </div>
        <p class="p-0 m-0 mt-1" style="font-size:.9em;">{{props.content}}</p>
        <span v-if="getUserRol()" @click="deleteCommentFn" class="options-button position-absolute" style="right: 5px; bottom: 5px;">
            <TrashIcon fill="#dc3545"/>
        </span>
    </div>
</template>