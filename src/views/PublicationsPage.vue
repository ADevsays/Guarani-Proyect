<script setup lang="ts">
import FormUpload from '../components/Publications/FormUpload.vue';
import TitlePage from '../components/TitlePage.vue';
import { centerFlex } from '../consts/communClasses';
import { usePublications } from '../store/usePublications';
import { useSessionUser } from '../store/userSession';
import {getObjectVirtual} from '../server/services/ObjectVirtual/getObjectVirtuals.ts';
import {ref, onMounted, watch, computed} from 'vue';
import AllPublications from '../components/Publications/AllPublications.vue';

const userStore = useSessionUser();
const publicationsStore = usePublications();
const user = ref({} as User);
const roleUser = ref('' as RoleString);
const openModal = ref({
    content: 'upload',
    state: false
});
const editID = ref('');
const serverError = ref(false);

const getAllPublications= async ()=>{
    const result = await getObjectVirtual();
    if(result){
        const publications = await result.json();
        return publications;
    }else{
        serverError.value = true;
    }
};

onMounted(async ()=>{
    user.value = userStore.getUser();
    if(user.value){
        roleUser.value = user.value?.rol;
    };
    const allPublications = await getAllPublications();
    if(allPublications){
        publicationsStore.setAllPublications(allPublications);
    }
});

watch(
    ()=> userStore.user,
    ()=> user.value = userStore.getUser()
);

const openModalFn = (modalState:{content:string,  value:boolean, id?:string})=>{
    openModal.value.state = modalState.value;
    openModal.value.content = modalState.content;
    if(modalState.id){
        editID.value = modalState.id;
    }
};

const closeModalFn=(modalState:{content:string, value:boolean})=>{
    openModal.value.state = modalState.value;
    editID.value = '';
}

const checkIfIsAdmin= computed(()=>{
    if(user.value != null){
        return user.value.rol == 'admin';
    }
});

</script>
<template>
    <main class="p-5" style="min-height: 100vh;">
        <TitlePage title="Publicaciones" text="Esto es lo que hace grande a nuestra comunidad..."/>
        <FormUpload v-if="openModal.state" @close-modal="closeModalFn" :type="openModal.content" :id="editID"/>
        <div :class="centerFlex" class="flex-column">
            <button v-if="checkIfIsAdmin" @click="openModalFn({content:'upload', value:true})" class="w-50 btn btn-primary m-3">Subir publicación</button>
            <div class="mt-3 text-center">
                <p v-show="serverError">Parece que hubo algún <span class="text-danger">problema</span> con el servidor, no se han podido recuperar las publicaciones</p>
                <AllPublications v-show="!serverError" @open-edit="openModalFn"/>
            </div>
        </div>
    </main>
</template>

<style>
body{
    position: relative;
}
</style>