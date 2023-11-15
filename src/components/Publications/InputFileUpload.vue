<script lang="ts" setup>
import UploadIcon from '../SVG/UploadIcon.vue';
import { centerFlex } from '../../consts/communClasses.ts';
const props = defineProps<{
    handleChange: (e: Event) => void
}>();
</script>
<template>
    <label style="min-width: 140px;" :class="centerFlex" class="flex-column mt-4 fw-medium py-2 h-100 btn btn-danger">
        <p class="h-100 w-100 p-0 m-0 gap-2" :class="centerFlex">
            <span :class="centerFlex">
                <UploadIcon />
            </span> Tu archivo
        </p>
        <input @change="props.handleChange" accept=".obj" type="file" style="display: none;">
    </label>
</template>