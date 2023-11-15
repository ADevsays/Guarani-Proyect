<script setup lang="ts">
import typesFormPublication from '../../consts/typesFormPublication';
import ContainerUploadForm from '../ContainerUploadForm.vue';
import { computed, ref, onMounted } from 'vue';
import CloseButton from '../Publications/CloseButton.vue';
import InputFormUpload from '../Publications/InputFormUpload.vue';
import InfoButton from '../Publications/InfoButton.vue';
import parseToDriveUrl from '../../helpers/parseToDriveUrl';
import { getToken } from '../../helpers/saveToken';
import { tokenName } from '../../consts/userToken';
import { postNew } from '../../server/services/News/postNew.ts'
import { useAllNews } from '../../store/useAllNews.ts';
import { getOneNew } from '../../server/services/News/getOneNew';
import { editNew } from '../../server/services/News/editNew.ts';
import { validateForm } from '../../helpers/validateForm';
import { checkIsURL } from '../../helpers/checkIsURL';

const defaultData = {
    title: '',
    url: '',
    description: ''
}
const token = getToken(tokenName);
const inputClasses = 'px-2 py-2 shadow rounded-2 border border-3 border-primary my-2 remove-outline';
const newsStore = useAllNews();
const props = defineProps<{
    type: string,
    id?: string
}>();
const emit = defineEmits(['closeModal']);

const dataNews = ref<DataToNew>(defaultData);

onMounted(async () => {
    if (props.id) {
        const result = await getOneNew(props.id);
        const userNew = await result?.json();
        if (!userNew) return;
        const keysUserNew = Object.keys(userNew);
        keysUserNew.forEach(key => {
            if (key == 'title' || key == 'url' || key == 'description') {
                dataNews.value[key] = userNew[key];
            }
        });
    } else {
        dataNews.value = defaultData;
        console.log(dataNews.value)
    }
})

const closeModal = (state: boolean) => {
    emit('closeModal', state);
}
const getFunction = computed(() => {
    if (props.type == typesFormPublication.UPLOAD) {
        return 'Escribe tu ';
    }
    return 'Edita esta ';
});

const handleChange = (e: Event) => {
    const input = e.target;
    if (!input) return;
    if (!(input instanceof HTMLInputElement
        || input instanceof HTMLTextAreaElement)) return;
    const value = input.value;
    const key = input.name;
    if (!(key in dataNews.value)) return;
    const typeKey = key as keyof DataToNew;
    if (key == 'url') {
        dataNews.value[typeKey] = parseToDriveUrl(value);
        return;
    }
    dataNews.value[typeKey] = value;
}

const createNew=async ()=>{
    try {
        if(!validateForm(dataNews.value)){
            alert('Por favor completa los datos');
            return;
        }
        if(!checkIsURL(dataNews.value.url)){
            alert('Esa no es una URL valida');
            return;
        }
        if (!token) return;
        const result = await postNew(dataNews.value, token);
        if (!result) throw new Error('Hubo un problema al subir la noticia');
        const userNew = await result.json();
        newsStore.addNew(userNew);
        emit('closeModal', false);
    } catch (error) {
        console.error(error);
    }
}

const editNewFn= async()=>{
    try {
        if(!validateForm(dataNews.value)){
            alert('Por favor completa los datos');
            return;
        };
        if(!checkIsURL(dataNews.value.url)){
            alert('Esa no es una URL valida');
            return;
        }
        if(!token) return;
        const result = await editNew((dataNews.value as NewData), token, (props.id as string));
        if(!result) throw new Error('Algo ha fallado');
        console.log(result)
        const newEdit = await result.json();
        const error = await newEdit.detail;
        if (error) throw new Error('Algo fallo');
        newsStore.updateNew(newEdit);
        closeModal(false);
        return true;
    } catch (error) {
        console.error(error);
    }
}

const handleSubmit = async () => {
    if(props.id){
        editNewFn();
    }else{
        createNew();
    }
}

</script>

<template>
    <ContainerUploadForm :handle-submit="handleSubmit" @close-modal="closeModal">
        <h3 class="fw-bold"> {{ getFunction }} <span class="text-primary">Noticia</span></h3>
        <CloseButton @close-modal="closeModal" />
        <InputFormUpload label="Título" name="title" maxlength="50" placeholder="El título de la noticia..." :handle-change="handleChange"
            :value="dataNews.title" />
        <InputFormUpload label="Dirección de Drive de tu imagen" name="url"
            placeholder="https://drive.google.com/file/d/1ZkYDYhw7MvVe-YLN-NQyhqEdZ6xbVcOn/view?usp=drive_link"
            :handle-change="handleChange" :value="dataNews.url" class="input-url" />
        <label class="d-flex flex-column fw-medium">Contenido
            <textarea :value="dataNews.description" @change="handleChange" name="description"
                style="min-height: 120px; max-height: 180px;" id="textarea" rows="4" :class="inputClasses"
                placeholder="Escribe tu publicación..." />
        </label>
        <InfoButton type="Noticia" top-content="50%" top-button="62%" />
        <button class="btn btn-primary mt-2 fw-medium">Publicar</button>
    </ContainerUploadForm>
</template>