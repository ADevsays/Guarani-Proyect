<script setup lang="ts">
import { centerFlex } from '../../consts/communClasses';
import InputFileUpload from './InputFileUpload.vue';
import InputFormUpload from './InputFormUpload.vue';
const props = defineProps<{
    handleChangeUrl: (e:Event)=>void,
    handleChangeFile: (e:Event)=>void,
    value:string,
    name:string
}>();
</script>
<template>
    <label :class="centerFlex" class="gap-2 lg-flex-wrap" >
            <InputFormUpload
                    label="Archivo de imagen"
                    :value="props.value"
                    class="input-url w-100 input-file-max"
                    :handle-change="props.handleChangeUrl"
                    :name="props.name"
                    placeholder="Ingresa la URL de la miniatura..."
                />
        <InputFileUpload class="input-file-max" :handle-change="props.handleChangeFile"/>
    </label>    
</template>

<style>
@media (max-width: 992px){
    .input-file-max{
        width: 100% !important;
        margin: 0 !important;
    }
    .lg-flex-wrap{
        flex-wrap: wrap !important;
    }
}
</style>