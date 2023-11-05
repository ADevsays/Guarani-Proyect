<script lang="ts" setup>
import CloseButton from './CloseButton.vue';
import { ref, computed } from 'vue';
import InfoButton from './InfoButton.vue';
import useFormPublication from '../../composables/useFormPublication';
import useFormVirtualReality from '../../composables/useFormVirtualReality.ts';
import InputFormUpload from './InputFormUpload.vue';
import CheckBoxList from './CheckBoxList.vue';
import InputFileUpload from './InputFileUpload.vue';

const emit = defineEmits(['closeModal']);
const divModal = ref(null as HTMLRef);
const inputClasses = 'px-2 py-2 shadow rounded-2 border border-3 border-primary my-2 remove-outline';
const props = defineProps({
    type: String,
    id: {
        type: String, requiered: false
    }
});
const { handleChange,
        editPublication,
        createPublication,
        changeDriveState,
        isDrive,
        objVData} = useFormPublication({ id: props.id as string });

const { is3DImg, 
        change3dState, 
        handleChange: handleChangeVR,
        handleSubmit:createVR} = useFormVirtualReality();

const selfCreatePublication = async()=>{
    const response = await createPublication();
    if(response){
        closeModal(false);
    }
};

const selfEditPublication= async()=>{
    const response = await editPublication();
    if(response){
        closeModal(false);
    }
};

const handleSubmit = async () => {
    if(is3DImg.value) {
        createVR(objVData.value as ObjectVirtual);
        return;
    }
    if (props.id) selfEditPublication();
    else selfCreatePublication();
};

const closeModalBg = (e: Event) => {
    const htmlElement = e.target;
    if (!htmlElement) return;
    if (htmlElement == divModal.value) {
        emit('closeModal', false);
    }
};

const closeModal = (state: boolean) => {
    emit('closeModal', state);
}

const getFunction = computed(() => {
    if (props.type == 'upload') {
        return 'Haz tu ';
    }
    return 'Edita esta ';
});

const getPlaceholderUrl = computed(()=>{
    if(isDrive.value){
        return 'Ingresa la URL de Drive...'
    }
    return 'Ingresa la URL de la imagen...'
})
</script>
<template>
    <div ref="divModal" @click="closeModalBg" class="position-absolute w-100 h-100 top-0 start-0"
        style="background-color:rgba(1, 0, 8, 0.844); z-index: 9; min-height: 100vh;">
        <form @submit.prevent="handleSubmit" style="z-index: 20;"
            class="d-flex w-100 flex-column text-black bg-white position-sticky gap-2 h-auto center-form p-4 px-5 rounded">
            <h3 class="fw-bold"> {{ getFunction }} <span class="text-primary">publicación</span></h3>
            <CloseButton @close-modal="closeModal" />
            <InputFormUpload
                label="Título"
                :value="objVData.title"
                maxlength="50"
                :handle-change="handleChange"
                name="title"
                placeholder="Ingresa el título..."
            />
            <InputFormUpload
                v-if="!is3DImg"
                label="Dirección de la imagen"
                :value="objVData.url"
                :handle-change="handleChange"
                name="url"
                class="input-url"
                :placeholder="getPlaceholderUrl"
            />
            <InputFileUpload v-else :handle-change="handleChangeVR"/>
            <CheckBoxList
                :editMode="props.id != ''"
                :change-drive-state="changeDriveState"
                :change3d-state="change3dState"
            />
            <label class="d-flex flex-column fw-medium">Contenido
                <textarea :value="objVData.description" @change="handleChange" name="description"
                    style="min-height: 120px; max-height: 180px;" id="textarea" rows="4" :class="inputClasses"
                    placeholder="Escribe tu publicación..."/>
            </label>
            <InfoButton />
            <InputFormUpload
                label="Lugar"
                :value="objVData.place"
                :handle-change="handleChange"
                name="place"
                placeholder="¿Dónde ha sido esto?"
            />
            <InputFormUpload
                label="Metadatos"
                :value="objVData.tag"
                :handle-change="handleChange"
                name="tag"
                placeholder="Añade las etiquetas, sepáralas con espacio"
            />
            <button class="btn btn-primary mt-2 fw-medium">Publicar</button>
        </form>
    </div>
</template>

<style >
.center-form {
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
}
.input-url input{
    border-color: #dc3545 !important;
}
.remove-outline:focus {
    outline: none;
}
</style>