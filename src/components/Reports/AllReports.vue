<script setup lang="ts">
const props = defineProps<{
    reports: Suggestion[]
}>();

</script>
<template>
    <div v-for="report in props.reports" class=" w-50  d-flex p-3 gap-3 justify-content-between align-items-center shadow mt-3 bg-white rounded">
        <p class="m-0 p-0">
            {{ report.description }}
        </p>
    </div>
</template>