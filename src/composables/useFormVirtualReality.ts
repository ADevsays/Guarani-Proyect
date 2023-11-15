import { tokenName } from "../consts/userToken";
import { getToken } from "../helpers/saveToken";
import { validateForm } from "../helpers/validateForm";
import { create3dObject } from "../server/services/ObjectVirtual/create3dObject";
import { usePublications } from "../store/usePublications";
import { ref } from 'vue';

export default function useFormVirtualReality() {
    const publicationsStore = usePublications();
    const token = getToken(tokenName) as string;
    const is3DImg = ref(false);
    const file = ref(null as File | null);

    const change3dState = (e: Event) => {
        const checkBox = e.target;
        if (!checkBox) return;
        if (!(checkBox instanceof HTMLInputElement)) return;
        if (checkBox.checked) {
            is3DImg.value = true;
        } else {
            is3DImg.value = false;
        }
    }

    const handleChange = (e: Event) => {
        const inputFile = e.target;
        if (!inputFile) return;
        if (!(inputFile instanceof HTMLInputElement)) return;
        if (!inputFile.files) return;
        const getFile = inputFile.files[0];
        const typeAllow = ['.obj']
        inputFile.accept = typeAllow.join(', ');
        const typeFile = getFile.name.split(".").pop()?.toLocaleLowerCase();
        if (!typeAllow.includes(`.${typeFile}`))
            throw new Error('ARCHIVO NO PERMITIDO');
        file.value = getFile;
    }

    const handleSubmit = async (objVData: ObjectVirtual) => {
        const objVRData = { ...objVData } as VirtualReality;
        objVRData.format = '3D';
        objVRData.img = file.value;
        try {
            if (!validateForm(objVRData)) {
                alert('Completa todos los datos');
                throw new Error(`Faltan datos en: ${JSON.stringify(objVRData)}`);
            };
            const formData = new FormData();
            for (const property in objVRData) {
                formData.append(property, objVRData[property])
            };
            const result = await create3dObject(formData, token);
            if (!result) return;
            const object3D = await result.json();
            publicationsStore.addPublication(object3D);
            return true;
        } catch (error) {
            console.error(error);
        }
    }

    return {
        is3DImg, change3dState, handleChange, handleSubmit
    }
}