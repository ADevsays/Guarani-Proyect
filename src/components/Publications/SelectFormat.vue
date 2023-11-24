<script setup lang="ts">
const props = defineProps<{
    handleChange: (e:Event)=>void,
    value:string
}>();
</script>
<template>
    <div 
        style="margin-top: 24px;"
        class="input-group border-primary border-3 border rounded-2">
        <label class="input-group-text p-2" for="inputGroupSelect01">Formato</label>
        <select 
            class="form-select fw-medium" 
            id="inputGroupSelect01" 
            :value="props.value"
            @change="props.handleChange">
            <option 
                class="text-primary fw-medium" 
                value="IMG" selected>Imagen</option>
            <option 
                class="text-success fw-medium" 
                value="AUDIO">Audio</option>
            <option 
                class="text-danger fw-medium" 
                value="VIDEO">Vídeo</option>
        </select>
    </div>
</template>