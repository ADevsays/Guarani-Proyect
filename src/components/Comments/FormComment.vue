<script setup lang="ts">
import { useRoute } from 'vue-router';
import useGetUser from '../../composables/useGetUser';
import { tokenName } from '../../consts/userToken';
import { getToken } from '../../helpers/saveToken';
import {postComment} from '../../server/services/Comments/postComment.ts';
import {ref, onMounted} from 'vue';
import { useComments } from '../../store/useComments';

const commentsStore = useComments();
const {user} = useGetUser();
const commentValue = ref('');
const id = ref('');
const token = getToken(tokenName);
const route = useRoute();

onMounted(()=>{
    id.value = route.params.id as string;
    console.log(user)
});

const handleChange=(e:Event)=>{
    const input = e.target;
    if(!input || !(input instanceof HTMLInputElement)) return;
    const value = input.value;
    commentValue.value = value;
}

const handleSubmit= async ()=>{
    const data = {
        description: commentValue.value
    }
    try {
        if(!token) throw new Error('No hay un usuario activo');
        const result = await postComment(data, token, id.value);
        if(!result) return;
        const comment = await result.json();
        commentsStore.addNewComment(comment);
        commentValue.value = '';
    } catch (error) {
        console.error(error);   
    }
}
</script>
<template>
    <form @submit.prevent="handleSubmit" class="w-100 mt-3">
        <label class="w-100 position-relative" >
            <span class="ms-1">
                 {{user?.user_name}}
            </span>
            <RouterLink class="w-100 btn btn-primary py-3" v-if="!user" to="/login">¿Quieres comentar? ¡Inicia sesión!</RouterLink>
            <input :value="commentValue" v-else @input="handleChange" class="mt-1 w-100 remove-outline rounded-3 p-3 border shadow-sm" type="text" placeholder="¿Qué opinas sobre esto?">
            <button :disabled="commentValue == ''" class="btn btn-primary mt-3 position-absolute end-0" style="bottom: -50px;">Publicar</button>
        </label>
    </form>
</template>