<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';

const thereIsSubtitle = ref(false);
const subtitle = ref('');
const regex = /\[([^\]]+)\]/g;

const props = defineProps({
    paragraph:String
});

const checkThereIsSubtitle=()=>{
    const coincidences = props?.paragraph?.match(regex);
    if(coincidences && coincidences[0]){
        thereIsSubtitle.value = true;
        const cleanText = coincidences[0].replace(regex, '$1');
        subtitle.value = cleanText;
        console.log(cleanText)
    }
};

const getParagraph = computed(()=>{
    if(!props.paragraph) return;
    if(regex.test(props?.paragraph)){
        return props.paragraph.replace(regex, '');
    }
    return props.paragraph;
});

onMounted(()=>{
    checkThereIsSubtitle();
})

</script>
<template>
    <h3 v-if="thereIsSubtitle" class="my-3">{{subtitle}}</h3>
    <p class="w-100">{{getParagraph}}</p>
</template>