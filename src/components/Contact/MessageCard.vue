<script setup lang="ts">
import {computed} from 'vue';
import { getToken } from '../../helpers/saveToken';
import { tokenName } from '../../consts/userToken';
import {deleteContact} from '../../server/services/Contact/deleteContact.ts'
import { useContacts } from '../../store/useContact';

const props = defineProps<{
    message: Contact
}>()

const contactStore = useContacts();
const token = getToken(tokenName);

const getName = computed(()=>{
    if(props.message){
        return `${props.message.name} ${props.message.lastname}`;
    }
});

const getContent= computed(()=>{
    if(!props.message) return 'Cargando';
    if(props.message.message.length > 30){
        return props.message.message.substring(0, 30);
    }
    return props.message.message;
});

const deleteOneContact = async ()=>{
    const userConfirm = confirm('¿Está seguro de que desea este mensaje? Esta acción NO se puede deshacer.')
    if(!userConfirm) return;
    try {
        if(!token) return;
        if(!props.message.id) return;
        const result = await deleteContact(token, props.message.id);
        if(!result) throw new Error('No se ha podido eliminar');
        if(!result.ok) throw new Error('La respuesta no ha sido positiva');
        contactStore.deleteContact(props.message.id);
    } catch (error) {
        console.error(error);
    }
}

</script>
<template>
    <div class="mt-2 rounded bg-primary text-white p-3 position-relative">
        <button 
            @click="deleteOneContact"
            class="btn btn-danger px-2 py-0 m-0 position-absolute" 
            style="font-size: .90em; top: 5px; right: 5px;">X</button>
        <h5 class="m-0">{{props.message.matter}}</h5>
        <span style="font-size: .9em; color: rgb(197, 197, 197);" class="p-0 mt-1 d-block">
            {{ getName }}
        </span>
        <p class="p-0 m-0">
            {{ getContent }}
        </p>
        <RouterLink class="text-white nav-link border rounded p-0 mt-2 px-2 position-absolute" style="bottom: 5px; right: 5px;" :to="`/mensajes/${message.id}`">Leer</RouterLink>
    </div>
</template>