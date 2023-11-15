<script lang="ts">
import routes from '../../router/routes';
import DropDown from './DropDown.vue';
export default{
    props: {
        to: {
            type: String, required: true
        },
        name: String
    },
    emits: ['closeNavBar'],
    data() {
        return {
            isRoute: false,
            routeToGetDropDown: routes[4].name
        };
    },
    watch: {
        '$route.path': {
            handler: function (path) {
                this.isRoute = path == this.to;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        emitClose() {
            this.$emit('closeNavBar');
        }
    },
    components: { DropDown }
}
</script>

<template>
    <div class="w-100 d-flex justify-content-center align-items-center me-3" style="height: 60px;">
        <RouterLink 
            @click="emitClose" 
            :class="{'border-bottom border-primary': isRoute}"  
            class="hover-link nav-link fw-seminormal" 
            aria-current="page" :to="to">
            {{name}}
        </RouterLink>
    </div>
    <DropDown @closeNavBar="emitClose" v-if="name == routeToGetDropDown" class="ms-2 my-3 dropDown-margin"/>

</template> 

<style>
    .hover-link:hover{
        color: #09f;
    }
</style>