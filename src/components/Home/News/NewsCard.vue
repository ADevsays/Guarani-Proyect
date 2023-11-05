<template>
    <div 
        class="d-flex flex-column rounded align-items-center justify-content-center text-white bg-newsCard">
        <h4>Título de la noticia</h4>
        <p>Cuerpo de la noticia</p>
        <RouterLink class="btn btn-dark opacity-75" to="/noticias">Leer completa</RouterLink>
    </div>
</template>

<style scoped scss>
.bg-newsCard{
    background-image: linear-gradient(to right,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)),
        url('https://www.ip.gov.py/ip/wp-content/uploads/2015/08/unnamed12.jpg');
}
</style>