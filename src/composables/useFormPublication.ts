import { ref, onMounted } from 'vue';
import { usePublications } from '../store/usePublications';
import { getToken } from '../helpers/saveToken';
import { tokenName } from '../consts/userToken';
import { getObjectVirtual } from '../server/services/ObjectVirtual/getObjectVirtuals';
import parseToDriveUrl from '../helpers/parseToDriveUrl';
import { createObjectVirtual } from '../server/services/ObjectVirtual/createObjectVirtual';
import { validateForm } from '../helpers/validateForm';
import { editObjectVirtual } from '../server/services/ObjectVirtual/editObjectVirutal';

export default function useFormPublication(props: { id: string }) {
    const publicationsStore = usePublications();
    const prevObjVData = {
        title: '',
        description: '',
        place: '',
        format: 'imagen',
        tag: '',
        url: ''
    }
    const token = getToken(tokenName);
    const objVData = ref(prevObjVData);
    const isDrive = ref(true);
    const driveUrl = ref('');

    onMounted(async () => {
        if (props.id) {
            console.log(props.id)
            const result = await getObjectVirtual(props.id);
            const publication = await result?.json();
            const keysPublication = Object.keys(publication);
            keysPublication.forEach(key => {
                if (key in objVData.value) {
                    const typeKey = key as keyof DataToPostObjV;
                    objVData.value[typeKey] = publication[key];
                }
            });
        } else {
            objVData.value = prevObjVData;
        }
    });


    const handleChange = (e: Event) => {
        const input = e.target;
        if (!input) return null;
        if (input instanceof HTMLInputElement
            || input instanceof HTMLTextAreaElement) {
            const value = input.value;
            const key = input.name;
            if (!(key in objVData.value)) return;
            const typeKey = key as keyof DataToPostObjV;
            if (typeKey == 'url' && isDrive.value) {
                const driveUrlParse = parseToDriveUrl(value) as string;
                objVData.value['url'] = driveUrlParse;
                driveUrl.value = driveUrlParse;
            } else {
                objVData.value[typeKey] = value.trim();
            }
        }
    };

    const createPublication = async () => {
        try {
            if (!validateForm(objVData.value)) {
                alert('Por favor completa los datos');
                return;
            };
            if (!token) return;
            const result = await createObjectVirtual(objVData.value, token);
            if (result) {
                const publication = await result.json();
                const error = await publication.detail;
                if (!error) {
                    publicationsStore.addPublication(publication);
                    return true;
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const editPublication = async () => {
        try {
            if (!validateForm(objVData.value)) {
                alert('Por favor completa los datos');
                return;
            };
            if (!token) return;
            if (!props.id) return;
            const result = await editObjectVirtual(objVData.value, token, props.id);
            if (result) {
                const publication = await result.json();
                const error = await publication.detail;
                if (!error) {
                    publicationsStore.updatePublications(publication);
                    return true;
                }
            }
        } catch (error) {
            console.error(error);
        }
    }


    const changeDriveState = (e: Event) => {
        const checkBox = e.target;
        if (!checkBox) return;
        if (!(checkBox instanceof HTMLInputElement)) return;
        if (checkBox.checked) {
            isDrive.value = true;
            objVData.value['url'] = driveUrl.value ? driveUrl.value : objVData.value['url'];
        } else {
            isDrive.value = false;
        }
    };

    return {
        handleChange,
        editPublication,
        createPublication,
        changeDriveState,
        objVData, isDrive, driveUrl
    }
}