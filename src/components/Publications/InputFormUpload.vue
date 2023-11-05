<script setup lang="ts">
const inputClasses = 'px-2 py-2 shadow rounded-2 border border-3 border-primary my-2 remove-outline';
const props = defineProps<{
    value: string, 
    maxlength?:string, 
    handleChange: (e:Event)=>void,
    placeholder:string,
    name:string,
    label:string
}>();
</script>
<template>
    <label class="d-flex flex-column fw-medium">
        {{props.label}}
        <input 
            :value="props.value" 
            :maxlength="props.maxlength" 
            @change="props.handleChange" 
            :name="props.name" 
            :class="inputClasses" 
            type="text"
            :placeholder="props.placeholder">
    </label>
</template>