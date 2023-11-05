<script setup lang="ts">
const props = defineProps<{
    changeDriveState: (e:Event)=>void,
    change3dState: (e:Event)=>void,
    editMode:boolean
}>();
</script>
<template>
    <div class="d-flex gap-2">
        <label class="form-check-label">
            Drive
            <input @change="props.changeDriveState" class="form-check-input mt-1" checked type="checkbox" id="flexCheckDefault">
        </label>
        <label v-if="!editMode" class="form-check-label">
            Imagen 3d
            <input @change="props.change3dState" class="form-check-input mt-1" type="checkbox" id="flexCheckDefault">
        </label>
    </div>
</template>