<script setup lang=ts>
import {ref, computed, inject} from 'vue';

const optionState = ref('admin');
const rol = inject('rol') as any;
optionState.value = rol.value.rol;

const emit = defineEmits(['setOptionState']);

const handleChange=()=>{
    if(rol.value.rol == 'editor'){
        optionState.value = 'editor';
    };
    emit('setOptionState', optionState.value);
};

const selectColor = computed(()=>{
    return optionState.value == 'admin' ? 'text-primary' : 'text-success';
});

const isNotAdmin = computed(()=>{
    return rol.value.rol != 'admin';
});

</script>
<template>
    <div class="input-group mt-3 mb-1">
        <label class="input-group-text p-2" for="inputGroupSelect01">Selecciona tu <span class="fw-semibold ms-1"> rol</span></label>
        <select v-model="optionState" @change="handleChange" :class="selectColor" class="form-select fw-medium" id="inputGroupSelect01">
            <option 
                :disabled="isNotAdmin"
                :class="{'text-secondary bg-light-subtle fw-italic': isNotAdmin}" 
                class="text-primary fw-medium" 
                value="admin" selected>Admin</option>
            <option class="text-success fw-medium" value="editor">Editor</option>
        </select>
    </div>
</template>