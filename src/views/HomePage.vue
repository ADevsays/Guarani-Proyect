<script setup lang="ts">
import FormSearchMain from '../components/Home/FormSearchMain.vue';
import LastNews from '../components/Home/News/LastNews.vue';
import BannerCreateAccount from '../components/Home/BannerCreateAccount.vue';
import BannerProducts from '../components/Home/Products/BannerProducts.vue';
import BannerHistories from  '../components/Home/CulturalEvent/BannerHistories.vue'
import useGetUser from '../composables/useGetUser.ts';
import { onMounted } from 'vue';
import { useSearch } from '../store/useSearch';
import { getObjectVirtual } from '../server/services/ObjectVirtual/getObjectVirtuals.ts';
const {user} = useGetUser();
const searchStore = useSearch();

const setAllPublicationsToSearch = async ()=>{
    try {
        const result = await getObjectVirtual();
        if(!result) throw new Error('No se han obtenido publicaciones');
        const publications = await result.json();
        searchStore.setAllSearch(publications, 'publications')
    } catch (error) {
        console.error(error);
    }
}

onMounted(()=>{
    setAllPublicationsToSearch();
});

</script>
<template>
    <main class="d-flex flex-column justify-content-center align-items-center">
        <div id="home-main" class="w-100 d-flex flex-column justify-content-center align-items-center">
            <div class="text-center text-white main-title">
                <h1 class="fw-bold ">La biblioteca más grande de la cultura Guarani</h1>
                <p class="fs-4">Participa, descubre, conoce e indaga en nuestra cultura</p>
                <FormSearchMain />
            </div>
        </div>
        <LastNews/>
        <BannerCreateAccount :to="user ? '/tu_cuenta' : '/registro'" title="Ingresa ahora a nuestra comunidad" text="Para poder comentar las últimas publicaciones" button="Crea una cuenta"/>
        <BannerProducts/>
        <BannerHistories/>
        <BannerCreateAccount class="px-5" to="/publicaciones" title="Las últimas publicaciones" text="Entérate de información exclusiva desde nuestras publicaciones" button="Ver publicaciones"/>
        <RouterLink to="/contacto" class="btn btn-dark p-3">¡CONTÁCTANOS!</RouterLink >
    </main>
</template>

<style scoped scss>
.main-title {
    text-shadow: 0 5px 8px rgb(36, 36, 36);
}

#home-main {
    font-family: 'Rubik', sans-serif;
    background-image: linear-gradient(to right,
            rgba(244, 255, 97, 0.1),
            rgba(255, 241, 159, 0.1)),
        url('../imgs/Background_home.webp');
    background-size: cover;
    background-position: 0 center;
    height: 90vh;
}
</style>