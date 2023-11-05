
import { RouterLink } from 'vue-router';
<template>
    <footer class="w-100 row bg-dark text-light mx-0 p-3" style="margin-top:100px;">
        <div class="col-12 col-lg-5  col-md-12 p-3">
            <router-link class="nav-link fw-seminormal w-100 text-wrap" to="/">
                <h3 class="title-header">PUEBLO GUARANI</h3>
            </router-link>
            <p class="text-right w-75" >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae voluptatibus eos molestias illum est
                quo aperiam adipisci nostrum iure ullam?
                <RouterLink to="/sobre_nosotros">Sobre nosotros...</RouterLink>
            </p>
            <h5>
                Redes Sociales:
            </h5>
            <ul class="list-group bg-dark d-flex mb-2">
                <li class="list-group-item bg-dark border-0  text-light p-0 m-0">Instagram</li>
                <li class="list-group-item bg-dark border-0  text-light p-0 m-0">Etc</li>
                <li class="list-group-item bg-dark border-0  text-light p-0 m-0">Etc</li>
            </ul>
        </div>
        <div class="col-12 col-lg-4  col-md-7 py-4">
            <h5>
                CONTÁCTANOS
            </h5>
            <p class="w-75">Puedes contactarnos por nuestras redes sociales
                o enviarnos un correo a <span class="fw-bold">ejemplo@gmail.com</span>
            </p>
            <p>Más información <router-link to="/contacto">aquí</router-link> </p>
            <h6>
                DIRECCIÓN
            </h6>
            <p>Dirección cra 12 20 - 19</p>
        </div>
        <div class="col-12 col-lg-3  col-md-5 py-4">
            <h5>
                ¿TIENES ALGÚN PROBLEMA?
            </h5>
            <p>
                Si quieres notificar algún error puedes hacerlo en 
                <RouterLink to="/reportes">Ayuda y soporte</RouterLink> 
            </p>
        </div>
    </footer>
</template>

<style scoped>
p{
    font-size: .9em;
}
</style>