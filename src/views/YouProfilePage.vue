<script setup lang="ts">
import ListIcons from '../components/YouProfile/ListIcons.vue';
import {computed, ref} from 'vue';
import { deleteToken } from '../helpers/saveToken';
import {tokenName} from '../consts/userToken.ts';
import { centerFlex } from '../consts/communClasses';
import useGetUser from '../composables/useGetUser';
import FormEdit from '../components/YouProfile/FormEdit.vue';

const {user} = useGetUser();
const openEditForm = ref(false);

const closeSession=()=>{
    const clientConfirm = confirm('¿Seguro de que quieres cerrar sesión?');
    if(clientConfirm){
        deleteToken(tokenName);
        window.location.href = '/';
    };
};

const editUser= ()=>{
    openEditForm.value = true;
};
const closeModalEdit=(state:boolean)=>{
    openEditForm.value = state;
}

const userName = computed(()=>{
    if(user.value != null) 
        return `${user.value.user_name} ${user.value.last_name}`;
    return 'Cargando...';
});

const userRol = computed(()=>{
    if(user.value != null) return user.value.rol;
    return 'Cargando...';
});

</script>
<template>
    <main class="w-100 h-100 position-relative">
        <FormEdit  v-show="openEditForm" @close-modal-edit="closeModalEdit"/>
        <div style="" class="bg-white position-relative w-100 h-100">
            <div class="bg-dark w-100 top-0" style="height: 130px;"></div>
            <div class="rounded-circle position-absolute border"
                style="height: 150px; width: 150px; top:55px; left: calc(50% - 150px/2);">
                <img class="h-100 w-100 rounded-circle"
                    src="https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg"
                    alt="Imagen de un usuario placeholder">
            </div>
            <div style="margin-top: 120px;" class="w-100 d-flex pb-5 p-2 pt-0 flex-column justify-content-center text-center align-items-center">
                <h4 class="fw-bold">{{userName}}</h4>
                <p class="text-secondary text-capitalize">{{userRol}}</p>
                <div :class="centerFlex" class="gap-3 flex-wrap">
                    <button class="btn btn-primary rounded-2 fw-medium p-1 px-3" @click="editUser">Editar cuenta</button>
                    <button class="btn btn-primary rounded-2 fw-medium p-1 px-3" @click="closeSession">Cerrar sesión</button>
                </div>
            </div>
            <hr>
            <ListIcons/>
        </div>
    </main>
</template>