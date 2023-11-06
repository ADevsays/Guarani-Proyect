<script setup lang=ts>
const props = defineProps({
    tag: String,
    classTag: String,
    isFeatured: {
        type: Boolean, default: false
    }
});
</script>
<template>
    <RouterLink to="/noticias" class="nav-link hover-event-card">
        <div style="width: 250px; height: auto;" class="shadow">
            <div style="min-height: 160px;">
                <img class="w-100 h-100 rounded-top-2 object-fit-cover "
                    src="https://artesaniasdecolombia.com.co/Documentos/Contenido/20525_molas-g.jpg"
                    alt="">
            </div>
            <div class="bg-white text-black p-2 pb-4 rounded-bottom">
                <span class="d-block" :class="props.classTag">
                    {{ props.tag }}
                </span>
                <h3 class="fw-bold fs-4">Título de la noticia</h3>
                <p v-show="props.isFeatured" style="font-size:15px">Lorem ipsum, dolor sit ai? Dolore.sit ai? Dolore.sit ai?
                    Dolore.sit ai? Dolore.sit ai? Dolore.sit ai? Dolore.</p>
                <span class="w-100 border-top d-block pt-2" style="font-size:12px">14 Abril 2023</span>
            </div>
        </div>
    </RouterLink>
</template>

<style>
.hover-event-card {
    transition: box-shadow .2s ease;
}
.hover-event-card:hover {
    box-shadow: -5px 1px 30px -8px rgba(0, 0, 0, 0.75);
}
</style>