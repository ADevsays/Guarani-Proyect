<script lang="ts" setup>
import UploadIcon from '../SVG/UploadIcon.vue';
import {centerFlex} from '../../consts/communClasses.ts';
const props = defineProps<{
    handleChange: (e:Event)=>void
}>();
</script>
<template>
    <div class="mb-2">
        <p class="fw-medium p-0 m-0 mb-2">Sube tu archivo</p>
        <label class="d-flex flex-column fw-medium w-100 py-2 h-100 btn btn-danger">
            <p class="h-100 w-100 p-0 m-0 gap-2" :class="centerFlex">
                <span :class="centerFlex">
                    <UploadIcon />
                </span> Sube tu archivo
            </p>
            <input @change="props.handleChange" accept="image/*" type="file" style="display: none;">
        </label>
    </div>
</template>