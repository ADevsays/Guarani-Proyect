<script setup lang="ts">
import { centerFlex } from '../../consts/communClasses';
import typesFormPublication from '../../consts/typesFormPublication';
import { tokenName } from '../../consts/userToken';
import { checkIsURL } from '../../helpers/checkIsURL';
import { getToken } from '../../helpers/saveToken';
import { validateForm } from '../../helpers/validateForm';
import ContainerUploadForm from '../ContainerUploadForm.vue';
import InputFormUpload from '../Publications/InputFormUpload.vue';
import { ref, computed } from 'vue';
import {postProduct} from '../../server/services/Products/postProduct.ts';
import {useAllProducts} from '../../store/useProducts.ts';
import CloseButton from '../Publications/CloseButton.vue';
import InfoButton from '../Publications/InfoButton.vue';
import parseToDriveUrl from '../../helpers/parseToDriveUrl';

const inputClasses = 'px-2 py-2 shadow rounded-2 border border-3 border-primary my-2 remove-outline';

const defaultData = {
    title: '',
    url: '',
    description: '',
    price: 0
};

const props = defineProps<{
    type: string,
    id?: string
}>();

const token = getToken(tokenName);
const emit = defineEmits(['closeModal']);
const productsData = ref(defaultData as DataToProduct);

const closeModal = (state: boolean) => {
    emit('closeModal', state);
}

const productsStore = useAllProducts();

const handleSubmit = async () => {
    try {
        if (!validateForm(productsData.value)) {
            alert('Por favor completa los datos');
            return;
        }
        if (!checkIsURL(productsData.value.url)) {
            alert('Esa no es una URL valida');
            return;
        }
        if (!token) return;
        const result = await postProduct(productsData.value, token);
        console.log(productsData.value)
        if (!result) throw new Error('Hubo un problema al subir la historia');
        const newProduct = await result.json();
        productsStore.addProducts(newProduct);
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
    const typeKey = key as keyof DataToProduct;
    if(!(typeKey in productsData.value)) return;
    if (key == 'url') {
        productsData.value[typeKey] = parseToDriveUrl(value);
        return;
    }
    if (key == 'price') {
        productsData.value[typeKey] = Number(value);
        return;
    }
    productsData.value[typeKey] = value;
}
const getShowFormEdit = computed(() => {
    console.log(props.type)
    return props.type == typesFormPublication.EDIT_VR;
});

</script>
<template>
    <ContainerUploadForm :handle-submit="handleSubmit" @close-modal="closeModal">
        <div v-if="getShowFormEdit" :class="centerFlex" class="flex-column text-center">
            <h3 class="fw-bold"> No puedes editar un <span class="text-primary">producto</span></h3>
            <p>Prueba crear uno nuevo</p>
        </div>
        <template v-else>
            <h3 class="fw-bold"> Crea un nuevo <span class="text-primary">Producto</span></h3>
            <CloseButton @close-modal="closeModal" />
            <InputFormUpload label="Nombre" name="title" maxlength="50" placeholder="Nombre del producto..."
                :handle-change="handleChange" :value="productsData.title" />
            <InputFormUpload label="Dirección de Drive de tu imagen" name="url"
                placeholder="https://drive.google.com/file/d/1ZkYDYhw7MvVe-YLN-NQyhqEdZ6xbVcOn/view?usp=drive_link"
                :handle-change="handleChange" :value="productsData.url" class="input-url" />
            <label class="d-flex flex-column fw-medium">Descripción
                <textarea :value="productsData.description" @change="handleChange" name="description"
                    style="min-height: 120px; max-height: 180px;" id="textarea" rows="4" :class="inputClasses"
                    placeholder="Describe tu producto..." />
            </label>
            <label class="d-flex flex-column fw-medium">Precio
                <input :value="productsData.price" @change="handleChange" name="price" :class="inputClasses"
                    type="number" placeholder="22.5$" step="0.1"/>
            </label>
            <InfoButton type="Producto" top-content="42%" top-button="52%" />
            <button class="btn btn-primary mt-2 fw-medium">Publicar</button>
        </template>

    </ContainerUploadForm>
</template>