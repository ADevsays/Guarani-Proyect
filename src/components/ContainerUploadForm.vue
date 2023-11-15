<script setup lang="ts">
import {ref} from 'vue';
const props = defineProps<{
    handleSubmit: (e:Event)=>void,
}>();

const emit = defineEmits(['closeModal'])
const divModal = ref(null as HTMLRef);
const clickStartInModal = ref(false);
const clickFinishInDiv = ref(false);

const closeModalBg = (e: Event) => {
    const htmlElement = e.target;
    if (!htmlElement) return;
    if (htmlElement != divModal.value) return;
    if(clickFinishInDiv.value 
    && clickStartInModal.value){
        clickFinishInDiv.value = false;
        clickStartInModal.value = false;
        return;
    }    
    emit('closeModal', false);    
};

const handleMouseDown=()=>{
    clickStartInModal.value = true;
}

const handleMouseUp=()=>{
    clickFinishInDiv.value = true;
}
</script>
<template>
    <div ref="divModal" @mouseup="handleMouseUp" @click="closeModalBg" class="position-absolute w-100 h-100 top-0 start-0"
        style="background-color:rgba(1, 0, 8, 0.844); z-index: 9; min-height: 100vh;">
        <form @mousedown="handleMouseDown" @submit.prevent="props.handleSubmit" style="z-index: 20;"             class="d-flex w-100 flex-column text-black bg-white position-sticky gap-2 h-auto center-form p-4 px-5 rounded">
            <slot/>
        </form>
    </div>
</template>