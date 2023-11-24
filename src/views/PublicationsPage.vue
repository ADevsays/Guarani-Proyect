<script setup lang="ts">
import FormUpload from '../components/Publications/FormUpload.vue';
import TitlePage from '../components/TitlePage.vue';
import { centerFlex } from '../consts/communClasses';
import { usePublications } from '../store/usePublications';
import { useSessionUser } from '../store/userSession';
import {getObjectVirtual} from '../server/services/ObjectVirtual/getObjectVirtuals.ts';
import {ref, onMounted, watch, computed} from 'vue';
import AllPublications from '../components/Publications/AllPublications.vue';
import useGetAllUsers from '../composables/useGetAllUsers.ts';
import Spinner from '../components/Spinner.vue';
import typesFormPublication from '../consts/typesFormPublication';
import {get3dAllObjects} from '../server/services/ObjectVirtual/get3dAllObjects.ts'

const userStore = useSessionUser();
const {getUsers} = useGetAllUsers();
const publicationsStore = usePublications();
const user = ref({} as User);
const roleUser = ref('' as RoleString);
const openModal = ref({
    content: typesFormPublication.UPLOAD,
    state: false
});
const editID = ref('');
const serverError = ref(false);
const loadPublications = ref(false);

const getAllPublications= async ()=>{
    const result = await getObjectVirtual();
    if(!result) {
        serverError.value = true;
        return;
    }
    const publications = await result.json();
    return publications;  
};

const getAllVirtualReality=async () => {
    const result = await get3dAllObjects();
    if(!result) {
        serverError.value = true;
        return;
    }
    const virtualReality = await result.json();
    return virtualReality; 
}

onMounted(async ()=>{
    user.value = userStore.getUser();
    if(user.value){
        roleUser.value = user.value?.rol;
    };
    const allPublications = await getAllPublications();
    const all3d = await getAllVirtualReality();
    if(all3d){
        const reversePublications = allPublications.reverse();
        const concatVRPlusPublications = [...reversePublications, ...all3d];
        publicationsStore.setAllPublications(concatVRPlusPublications);
    }
    else if(allPublications){
        publicationsStore.setAllPublications(allPublications);
    }
    loadPublications.value = true;
    getUsers();
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
            <Spinner border-color="#09f" v-if="!loadPublications"/>
            <div class="mt-3 text-center" v-else>
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