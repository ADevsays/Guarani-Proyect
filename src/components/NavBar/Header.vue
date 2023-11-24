<script lang="ts" setup>
import NavLink from './NavLink.vue';
import FormSearch from './FormSearch.vue';
import routes from '../../router/routes';
import { useSessionUser } from '../../store/userSession';
import { onMounted, ref, computed } from 'vue';
import { getToken, deleteToken } from '../../helpers/saveToken';
import { getUser } from '../../server/services/User/getUser.ts';
import {tokenName} from '../../consts/userToken.ts';
import BurguerIcon from '../SVG/BurguerIcon.vue';
import ArrowBackIcon from '../SVG/ArrowBackIcon.vue';

const userStore = useSessionUser();
const navBarCollapse = ref(null as HTMLRef);
const routesUse = ref(routes.filter(route => route.name));
const optionsState = ref(false);
const token = getToken(tokenName) as string;

const thereAreUser = computed(()=>{
    const user = userStore.getUser();
    return user != null;
});

const checkExistsUser = async (token: string) => {
    const result = await getUser(token);
    if(!result || (!result?.ok)){
        deleteToken(tokenName);
        console.error('Tuvimos que eliminar el token de sesión por una respuesta anómala del servidor');
    };
    if(result){
        const user = await result.json();
        const error = await user.detail;
        if(!error) return user;
        return null;
    };
};

onMounted(async () => {
    if (token && token != 'undefined') {
        const user = await checkExistsUser(token);
        if(user != null){
            routesUse.value = routesUse.value.filter((route: any) => !route.user);
            userStore.setUser(user);
        }
    }
});

const closeNav = () => {
    const navBar = navBarCollapse.value;
    if (!navBar) return null;
    navBar?.classList.remove('show');
};

const openOptions=()=>{
    optionsState.value = true;
}

const closeOptions=()=>{
    optionsState.value = false;
}

</script>
<template>
    <header>
        <div
            :class="optionsState ? 'openMessage' : 'closeMessage'"
            style="z-index: 9;"
            class="position-absolute top-0 px-2 pb-2 start-0 message bg-white h-100 rounded">
            <button @click="closeOptions" class="btn btn-dark mt-2 p-2 py-0">
                <span>
                    <ArrowBackIcon/>
                </span>
            </button>
            <h4 class="mt-2 mb-3">Mensajes de contacto dejados:</h4>
        </div>
        <nav class="navbar navbar-expand-lg border-bottom p-2 m-0" data-bs-theme="ligth">
            <div class="container-fluid p-0 m-0">
                <div class="w-100 d-flex justify-content-">
                    <button @click="openOptions">
                        <BurguerIcon/>
                    </button>
                    <router-link class="ms-2 navbar-brand fw-seminormal w-50 text-wrap" style="max-width: 250px;" to="/">
                        <span class="title-header">ASAMBLEA DEL PUEBLO GUARANI</span>
                    </router-link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse w-100" ref="navBarCollapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto">
                        <NavLink @closeNavBar="closeNav" v-for="route in routesUse" :to="route.path" :name="route.name"/>
                        
                        <div @click="closeNav" v-if="thereAreUser" style="height: 60px;" class="d-flex justify-content-center align-items-center">
                            <RouterLink style="min-width: 100px; max-width: 120px;" class="btn p-1 btn-dark w-100" to="/tu_cuenta">Perfil</RouterLink>
                        </div>
                    </div>
                    <FormSearch />
                </div>
            </div>
        </nav>
    </header>
</template>


<style scoped>

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
    transform: translateX(-640px);
    visibility: hidden;
}

</style>
