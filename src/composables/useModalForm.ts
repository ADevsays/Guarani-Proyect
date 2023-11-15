import typesFormPublication from "../consts/typesFormPublication";
import useGetUser from "./useGetUser";
import {ref, computed} from 'vue';

export default function useModalForm(){
    const { user } = useGetUser();
    const openModal = ref({
        content: typesFormPublication.UPLOAD,
        state: false,
    });

    const editID = ref('');
    
    const checkIfIsAdmin = computed(() => {
        if (user.value != null) {
            return user.value.rol == 'admin';
        }
    });
    
    const openModalFn = (modalState: { content: string, value: boolean, id?: string }) => {
        openModal.value.state = modalState.value;
        openModal.value.content = modalState.content;
    };
    
    const closeModalFn = (modalState: { content: string, value: boolean }) => {
        openModal.value.state = modalState.value;
        editID.value = '';
    }
    
    const editModal = (modal: { content: string, value: boolean, id?: string }) => {
        openModal.value.state = modal.value;
        openModal.value.content = modal.content;
        if (modal.id) {
            editID.value = modal.id;
        }
    }

    return{
        checkIfIsAdmin,editID,  openModal, closeModalFn, openModalFn, editModal
    }
}