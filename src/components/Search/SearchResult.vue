<script setup lang="ts">
import possibleSubtitlesSearch from '../../consts/possibleSubtitlesSearch';
import { ref, onMounted, computed } from 'vue';
import { centerFlex } from '../../consts/communClasses';
import SearchRenderCard from './SearchRenderCard.vue';

const props = defineProps<{
    search: SearchData[]
}>();

const arrayToUse = ref([] as any[]);

onMounted(() => {
    if (!props.search || props.search.length <= 0) return;
    arrayToUse.value = props.search;
    console.log(arrayToUse.value)
});

const getType = computed(() => {
    if (arrayToUse.value.length > 0) {
        const type = arrayToUse.value[0].type as keyof TypesOfSearchSubtitle;
        return possibleSubtitlesSearch[type];
    }
});
</script>

<template>
    <div class="px-2 m-3 border-bottom pb-3" v-if="search.length > 0">
        <h3 class="text-primary fw-bold mt-4">
            {{ getType }}:
        </h3>
        <div :class="centerFlex" class="flex-wrap p-2 gap-5">
            <SearchRenderCard :type="(getType as string)" :array-to-use="search" />
        </div>
    </div>
</template>