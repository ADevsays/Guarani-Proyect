<script lang="ts">
export default{
    data(){
        return{
            nameState: 'Comunidad'
        }
    }, 
    methods:{
        handleClick(name:string){
            this.nameState = name;
            this.$emit('closeNavBar')
        }
    }
}
</script>
<template>
    <div
        class="hover-link nav-link fw-seminormal dropdown d-flex flex-column justify-content-center m-0 p-0 align-items-center">
        <button class="nav-link dropdown-toggle border-none m-0 p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{nameState}}
        </button>
        <ul class="dropdown-menu" style="left: -20px;">
            <li><RouterLink @click="handleClick('Directos')" class="dropdown-item" to="/directos">Directos</RouterLink></li>
            <li><RouterLink @click="handleClick('Historias')" class="dropdown-item" to="/historias">Historias</RouterLink></li>
            <li><RouterLink @click="handleClick('Comunidad')" class="dropdown-item" to="/comunidad">Comunidad</RouterLink></li>
            <li><RouterLink @click="handleClick('Eventos')" class="dropdown-item" to="/eventos">Eventos</RouterLink></li>
        </ul>
    </div>
</template>