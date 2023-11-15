<script setup lang="ts">
import { useContacts } from '../../store/useContact';
import MessagesIcon from '../SVG/MessagesIcon.vue';
import ArrowBackIcon from '../SVG/ArrowBackIcon.vue';
import MessageCard from './MessageCard.vue';
import {ref, } from 'vue';

const modalState = ref(false);
const contactStore = useContacts();

const openMessages =()=>{
    modalState.value = true;
    window.scroll(0, 0)
}

const closeMessages =()=>{
    modalState.value = false;
};


</script>
<template>
    <div class="d-flex align-items-center justify-content-end w-100 overflow-hidden">
        <button class="btn btn-primary" @click="openMessages">
            <MessagesIcon/>
        </button>
        <div 
            style="z-index: 9;"
            :class="modalState ? 'openMessages' : 'closeMessage'"
            class="position-absolute top-0 px-2 pb-2 end-0 message bg-white h-100 rounded">
            <button @click="closeMessages" class="btn btn-dark mt-2 p-2 py-0">
                <span>
                    <ArrowBackIcon/>
                </span>
            </button>
            <h4 class="mt-2 mb-3">Mensajes de contacto dejados:</h4>
            <p v-show="contactStore.getContacts().length <= 0">Aún no hay mensajes...</p>
           <MessageCard v-for="message in contactStore.getContacts()" :message="message"/>
        </div>
    </div>
</template>

<style>
.message{
    transition: all 0.3s ease;
    overflow-y: scroll;
    border: 3px solid #09f;
    width: 380px;
}
.openMessage{
    transform: translateX(0px);
    visibility:visible;
}
.closeMessage{
    transform: translateX(640px);
    visibility: hidden;
}

@media (max-width: 669px){
    .message{
        width: 100%;
    }
}
</style>