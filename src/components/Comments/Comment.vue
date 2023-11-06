<script setup lang="ts">
const props = defineProps<{
    name:string, 
    date: string, 
    content:string
}>();
</script>

<template>
    <div class="d-flex flex-column bg-white shadow p-2 pb-3 rounded-1 w-100 comment mb-2">
        <div class="comment d-flex w-100 justify-content-between align-items-center">
            <span class="fw-medium text-primary">{{props.name}}</span>
            <span style="font-size: .7em;" class="text-secondary fw-medium">{{props.date}}</span>
        </div>
        <p class="p-0 m-0 mt-1" style="font-size:.9em;">{{props.content}}</p>
    </div>
</template>