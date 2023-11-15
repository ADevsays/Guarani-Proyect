<script setup lang="ts">
import TitlePage from '../components/TitlePage.vue';
import FormContact from '../components/Contact/FormContact.vue';
import BgContantImg from '../imgs/bg_contact_form.jpg';
import MessagesContact from '../components/Contact/MessagesContact.vue';
import { onMounted, computed } from 'vue';
import { useContacts } from '../store/useContact';
import {getAllContact} from '../server/services/Contact/getAllContacts.ts';
import { getToken } from '../helpers/saveToken';
import { tokenName } from '../consts/userToken';
import useGetUser from '../composables/useGetUser';

const contactStore = useContacts();
const {user} = useGetUser();
const token = getToken(tokenName);

const setAllContacts = async()=>{
    try {
        const result = await getAllContact(token as string);
        if(!result) throw new Error('Hubo un error');
        const contacts = await result.json();
        contactStore.setContacts(contacts)
    } catch (error) {
        console.error(error);
    }
};

onMounted(()=>{
    setAllContacts();
});


const getRole = computed(()=>{
    if(user){
        return user.value?.rol == 'admin';
    }
    return false;
})


</script>
<template>
    <main class="p-5 h-100 w-100 overflow-hidden position-relative" style="min-height: 100vh; background-color: rgb(249, 249, 249);">
        <TitlePage title="Contáctate con nosotros" text="Cuéntanos todos los detalles..." />
        <MessagesContact v-if="getRole"/>
        <div class="d-flex rounded mt-2 p-5">
            <div class="w-100 d-none d-md-block">
                <img 
                    class="object-fit-cover h-100 w-100 rounded-3  rounded-end-0" 
                    :src="BgContantImg"
                    alt="">
            </div>
            <FormContact/>
        </div>
    </main>
</template>

<style scoped>
body{
    background-color:rgb(249, 249, 249);;
}
</style>