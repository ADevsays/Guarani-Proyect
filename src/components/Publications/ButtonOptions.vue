<script setup lang="ts">
import ThreePointsIcon from '../SVG/ThreePointsIcon.vue';
import { centerFlex } from '../../consts/communClasses';
import PencilIcon from '../SVG/PencilIcon.vue';
import TrashIcon from '../SVG/TrashIcon.vue';
import { ref } from 'vue';
import useGetUser from '../../composables/useGetUser';

const props = defineProps<{
    checkRolUser: boolean | undefined,
}>();

const emit = defineEmits(['editPublication', 'deletePublication']);
const {user} = useGetUser();
const stateOptionsButtons = ref(false);
const changeStateButtons = (e:Event) => {
    e.stopPropagation();
    stateOptionsButtons.value = !stateOptionsButtons.value;
    const main = document.querySelector('main');
    const threeOptionsButton = e.target;
    if(!main) return;
    main.onclick = (e:Event)=> {
        if(e.target == threeOptionsButton) return;
        stateOptionsButtons.value = false;
        main.onclick = null;
    };
};

const editPublication=()=>{
    emit('editPublication');
};
const deletePublication=()=>{
    emit('deletePublication');
};
const getRolUser=()=>{
    if(user.value){
        return user.value.rol == 'admin';
    }
}
</script>

<template>
    <div @click="changeStateButtons"  v-if="props.checkRolUser" :class="centerFlex"
        class="position-absolute p-1 rounded edit-button">
        <div v-if="stateOptionsButtons" 
            :class="centerFlex"
            class="bg-transparent flex-column position-absolute rounded"
            style="top: -17px; left: 25px; width:50px;">
            <span @click="editPublication" class="w-100 h-100 bg-dark text-center rounded-top pb-1 options-button">
                <PencilIcon />
            </span>
            <span v-if="getRolUser()" @click="deletePublication" class="w-100 h-100 bg-dark text-center pb-1 border-top rounded-bottom options-button">
                <TrashIcon />
            </span>
        </div>
        <ThreePointsIcon class="h-100 w-100 p-0 m-0"/>
    </div>
</template>

<style>
.options-button svg {
    opacity: .7;
}
.options-button:hover svg {
    opacity: 1;
    cursor: pointer;
}
</style>