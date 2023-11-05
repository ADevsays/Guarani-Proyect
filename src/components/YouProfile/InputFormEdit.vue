<script setup lang="ts">
import PeopleIcon from '../SVG/PeopleIcon.vue';

const props = defineProps<{
    handleChange: (e:Event)=>void,
    label:string,
    placeholder: string,
    type?: string | 'text';
    name:string,
    value:string | undefined
}>();

</script>
<template>
    <label class="mt-3 position-relative d-flex flex-column" >{{props.label}}
        <PeopleIcon class="position-absolute" style="right: 10px; top: 52%;" />
        <input 
            @change="props.handleChange" 
            class="placeholder-change p-2 border border-secondary-subtle rounded-1"
            :type="props.type"
            :name="props.name"
            :value="props.value"
            :placeholder="props.placeholder">
    </label>
</template>