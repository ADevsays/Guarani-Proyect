<script setup lang="ts">
import InputFormEdit from '../YouProfile/InputFormEdit.vue';
import {postContact} from '../../server/services/Contact/postContact.ts';
import { centerFlex } from '../../consts/communClasses';
import { ref } from 'vue';
import { getToken } from '../../helpers/saveToken';
import { tokenName } from '../../consts/userToken';
import {useContacts} from '../../store/useContact.ts';

const inputsForm = [
    {
        label: 'Nombres',
        placeholder: 'Ingresa tu nombre',
        type: 'text',
        name: 'name'
    },
    {
        label: 'Apellidos',
        placeholder: 'Ingresa tu apellido',
        type: 'text',
        name: 'lastname'
    },
    {
        label: 'Email',
        placeholder: 'Ingresa tu email',
        type: 'email',
        name: 'email'
    },
    {
        label: 'Tu sitio web',
        placeholder: 'Ingresa tu URL',
        type: 'text',
        name: 'web'
    },
    {
        label: 'Asunto',
        placeholder: 'Asunto del mensaje',
        type: 'text',
        name: 'matter',
    }
];

const dataToContact = ref<DataToContact>({
    name: '',
    lastname: '',
    email: '',
    web: '',
    matter: '',
    consultation:'',
    message: ''
});

const token = getToken(tokenName);
const contactStore = useContacts();

const handleChange = (e: Event) => {
    const input = e.target;
    if (!input) return;
    if (input instanceof HTMLInputElement 
        || input instanceof HTMLTextAreaElement) {
        const value = input.value;
        const key = input.name;
        if (key in dataToContact.value) {
            const typeKey = key as keyof DataToContact;
            dataToContact.value[typeKey] = value;
        }
    }
};
const handleSubmit = async () => {
    try {
        if(!token) return;
        const result = await postContact(dataToContact.value, token);
        if(!result) return;
        const contact = await result.json();
        if(!contact) throw new Error('Hubo un problema');
        contactStore.setContacts(contact);
        alert('¡Se ha compartido tu mensaje!')
        window.location.href = '/';                
       
    } catch (error) {
        console.error(error);
    }
}
const getValue = (key: string) => {
    if (key in dataToContact.value) {
        const typeKey = key as keyof DataToContact;
        return dataToContact.value[typeKey];
    }
};

</script>
<template>
    <div :class="centerFlex" class="w-100 flex-column p-3 bg-white rounded-3 rounded-start-0">
        <h3 style="color: rgb(0, 0, 41);" class="w-100 fw-bold fs-2 text-center mt-3">Escribe tu <span
                class="text-primary">mensaje</span> </h3>
        <form @submit.prevent="handleSubmit" class="form-contact p-2">
            <InputFormEdit 
                v-for="input in inputsForm" 
                :handle-change="handleChange" 
                :label="input.label"
                :value="getValue(input.name)" 
                :placeholder="input.placeholder" 
                :name="input.name" 
                :type="input.type" />
            <label class="mt-3 position-relative d-flex flex-column">Mensaje
                <textarea 
                    required
                    @change="handleChange"
                    name="message"
                    placeholder="¿Qué te gustaría contar?" style="min-height: 150px; max-height: 320px; "
                    class="placeholder-change p-2 border border-secondary-subtle rounded-1" />
            </label>
            <button class="mt-3 btn btn-primary">Enviar mensaje</button>
        </form>
    </div>
</template>

<style scoped>
.form-contact {
    width: 75%;
}

@media (max-width:669px) {
    .form-contact {
        width: 100%;
    }
}
</style>