<template>
    <RouterLink to="/productos" class="nav-link">
        <div class="  text-center d-flex flex-column justify-content-center position-relative align-items-center">
            <span class="bg-danger text-white px-2 position-absolute top-0 start-0">15%</span>
            <div class="bg-secondary-subtle" style="width: 240px; height: 250px;">
                <img class="w-100 h-100 object-fit-cover"
                    src="https://artesaniasdecolombia.com.co/Documentos/Contenido/29823_convenio-economias-propias-artesanias-colombia-2018-p.jpg"
                    alt="">
            </div>
            <div class="mt-2">
                <h4 class="fw-bold fs-6">Nombre del producto</h4>
                <p>$100</p>
            </div>
            <RouterLink to="/Productos" class="w-100 btn btn-dark">Ver más</RouterLink>
        </div>
    </RouterLink>
</template>