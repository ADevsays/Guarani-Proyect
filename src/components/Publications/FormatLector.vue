<script setup lang="ts">
import possibleFormats from '../../consts/possibleFormats.ts';
import {computed, onMounted, ref} from 'vue';
import loadImg from '../../helpers/loadImg';
import PlaceHolderImg from '../../imgs/Imagen_Placeholder.webp';

const stateImg = ref(false);

const props = defineProps<{
    format: Format,
    url:string
}>();

onMounted(()=>{
    stateImg.value = false;
    loadImg(props.url).then(()=> stateImg.value = true);
});

const tagToShow=(format:string)=>{
    return possibleFormats[props.format] == format;
};

const getURL = computed(()=>{
    const format = possibleFormats[props.format];
    if(format != possibleFormats.IMG)
    return props.url;
    if(stateImg.value) return props.url;
    return PlaceHolderImg;
});

</script>
<template>
    <img 
        v-if="tagToShow(possibleFormats.IMG)" 
        :src="getURL"
        class="w-100 h-100 object-fit-contain" 
        style="min-height: 300px;">
    <audio 
        v-else-if="tagToShow(possibleFormats.AUDIO)" 
        :src="getURL" 
        class="w-100"
        controls>
        Tu navegador no soporta el elemento <code>audio</code>.
    </audio>
    <video 
        v-else 
        :src="getURL"  
        controls 
        class="w-100" 
        height="360">
        Tu navegador no soporta el elemento <code>vídeo</code>.
    </video>
</template>