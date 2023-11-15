<script setup lang="ts">
import {postSuggestion} from '../../server/services/Suggestions/postSuggestions.ts';
import { centerFlex } from '../../consts/communClasses';
import { ref } from 'vue';
import { getToken } from '../../helpers/saveToken';
import { tokenName } from '../../consts/userToken';
import {useSuggestions} from '../../store/useSuggestions.ts';

const token = getToken(tokenName);
const reportMessage = ref<DataToSuggestion>({
    description: ''
});
const suggestionStore = useSuggestions();
const handleChange = (e: Event) => {
    const input = e.target;
    if(input instanceof HTMLTextAreaElement)
    reportMessage.value.description =  input.value;
};
const handleSubmit = async () => {
    try {
        if(!token) return;
        const result = await postSuggestion(reportMessage.value, token);
        if(!result) return;
        const message = await result.json();
        if(!message) throw new Error('Hubo un problema');
        suggestionStore.setSuggestions(message);
        alert('¡Se ha compartido tu reporte!')
        window.location.href = '/';                
       
    } catch (error) {
        console.error(error);
    }
}

</script>
<template>
    <div :class="centerFlex" class="w-100 flex-column p-3 bg-white rounded-3 rounded-start-0">
        <h3 style="color: rgb(0, 0, 41);" class="w-100 fw-bold fs-2 text-center mt-3"> Cuéntanos cómo podemos <span
                class="text-primary">mejorar</span> </h3>
        <form @submit.prevent="handleSubmit" class="form-contact p-2">
            <label class="mt-3 position-relative d-flex flex-column">Mensaje
                <textarea 
                    required
                    @change="handleChange"
                    name="message"
                    placeholder="¿Qué te gustaría decirnos?" style="min-height: 150px; max-height: 320px; "
                    class="placeholder-change p-2 border border-secondary-subtle rounded-1" />
            </label>
            <button class="mt-3 btn btn-primary">Enviar reporte</button>
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