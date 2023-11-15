import { ref, onMounted } from 'vue';
import { usePublications } from '../store/usePublications';
import { getToken } from '../helpers/saveToken';
import { tokenName } from '../consts/userToken';
import { getObjectVirtual } from '../server/services/ObjectVirtual/getObjectVirtuals';
import parseToDriveUrl from '../helpers/parseToDriveUrl';
import { createObjectVirtual } from '../server/services/ObjectVirtual/createObjectVirtual';
import { validateForm } from '../helpers/validateForm';
import { editObjectVirtual } from '../server/services/ObjectVirtual/editObjectVirutal';
import { checkIsURL } from '../helpers/checkIsURL';
import typesFormPublication from '../consts/typesFormPublication';

export default function useFormPublication(props: { id: string, type: string }) {
    const publicationsStore = usePublications();
    const prevObjVData = {
        title: '',
        description: '',
        place: '',
        format: 'imagen',
        tag: '',
        url: '',
        img: ''
    }
    const token = getToken(tokenName);
    const objVData = ref(prevObjVData);
    const isDrive = ref(true);
    const driveUrl = ref('');

    onMounted(async () => {
        if (props.id && props.type != typesFormPublication.EDIT_VR) {
            const result = await getObjectVirtual(props.id);
            const publication = await result?.json();
            if (!publication) return;
            const keysPublication = Object.keys(publication.digital_object);
            keysPublication.forEach(key => {
                if (key in objVData.value) {
                    const typeKey = key as keyof DataToPostObjV;
                    objVData.value[typeKey] = publication.digital_object[key];
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
        objVData.value.img = 'value';
        try {
            if (!validateForm(objVData.value)) {
                alert('Por favor completa los datos');
                return;
            };
            if (!checkIsURL(objVData.value.url)) {
                alert('Esa no es una URL valida');
                return;
            }
            if (!token) return;
            const result = await createObjectVirtual(objVData.value, token);
            if (!result) return;
            const publication = await result.json();
            console.log(publication)
            const error = await publication.detail;
            if (!error) {
                publicationsStore.addPublication(publication);
                return true;
            }

        } catch (error) {
            console.error(error);
        }
    };

    const editPublication = async () => {
        objVData.value.img = 'Value';
        try {
            if (!validateForm(objVData.value)) {
                alert('Por favor completa los datos');
                return;
            };
            if (!checkIsURL(objVData.value.url)) {
                alert('Esa no es una URL valida');
                return;
            }
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

            } else {
                const result = await editObjectVirtual(objVData.value, token, props.id);
                if (result) {
                    const publication = await result.json();
                    const error = await publication.detail;
                    if (!error) {
                        publicationsStore.updatePublications(publication);
                        return true;
                    }
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