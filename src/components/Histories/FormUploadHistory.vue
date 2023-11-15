<script setup lang="ts">
import typesFormPublication from '../../consts/typesFormPublication';
import ContainerUploadForm from '../ContainerUploadForm.vue';
import { computed, ref } from 'vue';
import CloseButton from '../Publications/CloseButton.vue';
import InputFormUpload from '../Publications/InputFormUpload.vue';
import InfoButton from '../Publications/InfoButton.vue';
import parseToDriveUrl from '../../helpers/parseToDriveUrl';
import { validateForm } from '../../helpers/validateForm';
import { getToken } from '../../helpers/saveToken';
import { tokenName } from '../../consts/userToken';
import { checkIsURL } from '../../helpers/checkIsURL';
import { postHistory } from '../../server/services/Histories/postHistory.ts';
import { useAllHistories } from '../../store/useAllHistories.ts';
import { centerFlex } from '../../consts/communClasses';

const inputClasses = 'px-2 py-2 shadow rounded-2 border border-3 border-primary my-2 remove-outline';

const defaultData = {
    title: '',
    url: '',
    description: '',
    format: 'imagen',
    tag: ''
};

const props = defineProps<{
    type: string,
    id?: string
}>();

const historyStore = useAllHistories();
const token = getToken(tokenName);
const emit = defineEmits(['closeModal']);
const histories = ref<DataToHistory>(defaultData);

const getFunction = computed(() => {
    if (props.type == typesFormPublication.UPLOAD) {
        return 'Escribe tu ';
    }
    return 'Edita esta ';
});

const closeModal = (state: boolean) => {
    emit('closeModal', state);
}

const handleSubmit = async () => {
    try {
        if (!validateForm(histories.value)) {
            alert('Por favor completa los datos');
            return;
        }
        if (!checkIsURL(histories.value.url)) {
            alert('Esa no es una URL valida');
            return;
        }
        if (!token) return;
        const result = await postHistory(histories.value, token);
        if (!result) throw new Error('Hubo un problema al subir la historia');
        const newHistory = await result.json();
        historyStore.addHistory(newHistory);
        emit('closeModal', false);
    } catch (error) {
        console.error(error);
    }
}

const handleChange = (e: Event) => {
    const input = e.target;
    if (!input) return;
    if (!(input instanceof HTMLInputElement
        || input instanceof HTMLTextAreaElement)) return;
    const value = input.value;
    const key = input.name;
    if (!(key in histories.value)) return;
    const typeKey = key as keyof DataToNew;
    if (key == 'url') {
        histories.value[typeKey] = parseToDriveUrl(value);
        return;
    }
    histories.value[typeKey] = value;
}
const getShowFormEdit = computed(()=>{
    console.log(props.type)
    return props.type == typesFormPublication.EDIT_VR;
});
</script>
<template>
    <ContainerUploadForm :handle-submit="handleSubmit" @close-modal="closeModal">
        <div v-if="getShowFormEdit" :class="centerFlex" class="flex-column text-center">
            <h3 class="fw-bold"> No puedes editar una <span class="text-primary">historia</span></h3>
            <p>¡Prueba a contar una nueva!</p>
        </div>
        <template v-else>
            <h3 class="fw-bold"> {{ getFunction }} <span class="text-primary">Historia</span></h3>
            <CloseButton @close-modal="closeModal" />
            <InputFormUpload label="Título" name="title" maxlength="50" placeholder="El título de la historia"
                :handle-change="handleChange" :value="histories.title" />
            <InputFormUpload label="Dirección de Drive de tu imagen" name="url"
                placeholder="https://drive.google.com/file/d/1ZkYDYhw7MvVe-YLN-NQyhqEdZ6xbVcOn/view?usp=drive_link"
                :handle-change="handleChange" :value="histories.url" class="input-url" />
            <label class="d-flex flex-column fw-medium">Contenido
                <textarea :value="histories.description" @change="handleChange" name="description"
                    style="min-height: 120px; max-height: 180px;" id="textarea" rows="4" :class="inputClasses"
                    placeholder="Escribe tu historia..." />
            </label>
            <InfoButton type="Historia" top-content="45%" top-button="52%" />
            <InputFormUpload label="Metadatos" name="tag" placeholder="Añade etiquetas, sepáralas con espacio..."
                :handle-change="handleChange" :value="histories.tag" />
            <button class="btn btn-primary mt-2 fw-medium">Publicar</button>
        </template>
    </ContainerUploadForm>
</template>