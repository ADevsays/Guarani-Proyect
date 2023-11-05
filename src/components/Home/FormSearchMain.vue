<script lang="ts">
import SearchIcon from '../SVG/SearchIcon.vue';
export default{
    components:{
        SearchIcon
    },
    data(){
        return{
            inputValue: ''
        }
    },
    methods:{
        onSubmit(){
            const query = this.inputValue;
            if(query){
                this.$router.push(`/buscar/${query}`);
            }
            this.inputValue = '';
        }
    }
}
</script>
<template>
    <form @submit.prevent="onSubmit" style="margin-top: 80px;" class="d-flex justify-content-center align-items-center">
        <label class="w-75 position-relative d-flex justity-content-center">
            <button class="position-absolute border-0 bg-white m-0 p-0" style="top:16px; left:20px;">
                <SearchIcon color="#000"/>
            </button>
            <input
                v-model="inputValue"
                class="w-100 ps-5 border border-secondary-subtle p-3 rounded-3 outline-none" 
                type="text"
                placeholder="Busca entre todos nuestros archivos...">
        </label>
    </form>
</template>

<style scoped>
.outline-none{
    outline: none !important;
}
</style>