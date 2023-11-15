<script lang="ts" setup>
import CloseButton from './CloseButton.vue';
import { computed } from 'vue';
import InfoButton from './InfoButton.vue';
import useFormPublication from '../../composables/useFormPublication';
import useFormVirtualReality from '../../composables/useFormVirtualReality.ts';
import InputFormUpload from './InputFormUpload.vue';
import CheckBoxList from './CheckBoxList.vue';
import typesFormPublication from '../../consts/typesFormPublication';
import Image3dInput from './Image3dInput.vue';
import ContainerUploadForm from '../ContainerUploadForm.vue';
import { centerFlex } from '../../consts/communClasses';

const emit = defineEmits(['closeModal']);
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
    objVData } = useFormPublication({ id: props.id as string, type: props.type as string });

const { is3DImg,
    change3dState,
    handleChange: handleChangeVR,
    handleSubmit: createVR } = useFormVirtualReality();

const selfCreatePublication = async () => {
    const response = await createPublication();
    if (response) {
        closeModal(false);
    }
};

const selfEditPublication = async () => {
    const response = await editPublication();
    if (response) {
        closeModal(false);
    }
};

const handleSubmit = async () => {
    if (is3DImg.value) {
        createVR(objVData.value as ObjectVirtual);
        closeModal(false);
        return;
    }
    if (props.id) selfEditPublication();
    else selfCreatePublication();
};


const closeModal = (state: boolean) => {
    emit('closeModal', state);
}

const getFunction = computed(() => {
    if (props.type == typesFormPublication.UPLOAD) {
        return 'Haz tu ';
    }
    return 'Edita esta ';
});

const getPlaceholderUrl = computed(() => {
    if (isDrive.value) {
        return 'Ingresa la URL de Drive...'
    }
    return 'Ingresa la URL de la imagen...'
})

const getValueTag = computed(() => {
    if (is3DImg.value) {
        objVData.value.tag = '3d';
        return '3d';
    }
    return objVData.value.tag
})

const getShowFormEdit = computed(()=>{
    return props.type == typesFormPublication.EDIT_VR;
});

</script>
<template>
    <ContainerUploadForm :handle-submit="handleSubmit" @close-modal="closeModal(false)">
        <div v-if="getShowFormEdit" :class="centerFlex" class="flex-column text-center">
            <h3 class="fw-bold"> Por el momento no puedes editar esta <span class="text-primary">publicación</span></h3>
            <p>No puedes editar una publicación que utiliza 3D</p>
        </div>
        <template v-else>
            <h3 class="fw-bold"> {{ getFunction }} <span class="text-primary">publicación</span></h3>
            <CloseButton @close-modal="closeModal" />
            <InputFormUpload label="Título" :value="objVData.title" maxlength="50" :handle-change="handleChange"
                name="title" placeholder="Ingresa el título..." />
            <InputFormUpload v-if="!is3DImg" label="Dirección de la imagen" :value="objVData.url"
                :handle-change="handleChange" name="url" class="input-url" :placeholder="getPlaceholderUrl" />
            <Image3dInput v-else name="url" :value="objVData.url" :handle-change-url="handleChange"
                :handle-change-file="handleChangeVR" />
            <CheckBoxList :editMode="props.id != ''" :change-drive-state="changeDriveState"
                :change3d-state="change3dState" />
            <label class="d-flex flex-column fw-medium">Contenido
                <textarea :value="objVData.description" @change="handleChange" name="description"
                    style="min-height: 120px; max-height: 180px;" id="textarea" rows="4" :class="inputClasses"
                    placeholder="Escribe tu publicación..." />
            </label>
            <InfoButton type="Publicación" />
            <InputFormUpload label="Lugar" :value="objVData.place" :handle-change="handleChange" name="place"
                placeholder="¿Dónde ha sido esto?" />
            <InputFormUpload label="Metadatos" :value="getValueTag" :handle-change="handleChange" name="tag"
                placeholder="Añade las etiquetas, sepáralas con espacio" />
            <button class="btn btn-primary mt-2 fw-medium">Publicar</button>
        </template>
    </ContainerUploadForm>
</template>

<style >
.center-form {
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
}

.input-url input {
    border-color: #dc3545 !important;
}

.remove-outline:focus {
    outline: none;
}
</style>