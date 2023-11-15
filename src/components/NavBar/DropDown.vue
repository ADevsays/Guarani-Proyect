<script lang="ts">
export default{
    data(){
        return{
            nameState: 'Nosotros'
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
            <li><RouterLink @click="handleClick('Nosotros')" class="dropdown-item" to="/sobre_nosotros">Nosotros</RouterLink></li>
            <li><RouterLink @click="handleClick('Contacto')" class="dropdown-item" to="/contacto">Contacto</RouterLink></li>
            <li><RouterLink @click="handleClick('Reportes')" class="dropdown-item" to="/reportes">Reportes</RouterLink></li>
        </ul>
    </div>
</template>