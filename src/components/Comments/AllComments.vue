<script setup lang="ts">
import { centerFlex } from '../../consts/communClasses';
import {getDescriptionTime} from '../../helpers/getDescriptionTime.ts';
import FormComment from './FormComment.vue';
import Comment from './Comment.vue';
import {computed} from 'vue';
import { useAllUsers } from '../../store/useAllUsers';

const allUsersStore = useAllUsers();
const props = defineProps<{
    comments: Comment[]
}>();

const comments = computed(()=>{
    return props.comments.reverse();
});

const getComments = ()=>{
    return props.comments.length > 0;
};

const getUserName = (id:string)=>{
    const userName = allUsersStore.getOneUser(id);
    if(!userName) return 'Usuario'
    return userName?.user_name;
};

</script>
<template>
    <div :class="centerFlex" class="m-5 flex-column w-100">
        <h4 class="fw-bold">Comentarios</h4>
        <FormComment/>
        <div class="w-100 h-100 p-3 pt-4 rounded comment" style="margin-top: 80px; background-color: rgb(243, 243, 243);">
            <p v-show="!getComments()" class="text-center p-0 m-0 pb-1">Sé el primero en comentar</p>
            <p v-show="getComments()" class="w-full text-end fw-bold p-0">Lo mejor</p>
            <Comment 
                v-show="getComments()" 
                v-for="comment in comments"
                :id="String(comment.id)"
                :name="(getUserName(String(comment.user)) as string)"
                :content="comment.description"
                :date="getDescriptionTime(comment.start_date)"/>
        </div>
    </div>
</template>