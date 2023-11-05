<script lang="ts">
import SearchIcon from '../SVG/SearchIcon.vue';

const width = document.documentElement.clientWidth < 1200 ? '100%' : '120px';

const defaultStyles = {
    'width': '0px',
    'border': 'none',
    'padding': '0',
    'opacity': '0',
};
export default {
    components: {
        SearchIcon
    },
    data() {
        return {
            openInput: false,
            styleObj: defaultStyles,
            inputValue: ''
        }
    },
    methods: {
        onSubmit() {
            const query = this.inputValue;
            if(query){
                this.$router.push(`/buscar/${query}`);
            }
            this.inputValue = '';
        },
        onChangeInputState() {
            this.openInput = !this.openInput;
        },
    },
    computed: {
        getWidth() {
            if (this.openInput) {
                this.styleObj = {
                    'width': width,
                    'border': '1px solid',
                    'padding': '4px',
                    'opacity': '1',
                }
                return this.styleObj;
            }
            this.styleObj = defaultStyles;
            return this.styleObj;
        }
    }
}
</script>
<template>
    <form @submit.prevent="onSubmit" class="m-2 d-flex align-items-center gap-2">
        <input
            v-model="inputValue"
            type="text" 
            class="rounded m-0 transition-input" 
            :style="getWidth" 
            placeholder="Buscar...">
        <button @click="onChangeInputState" class="btn btn-primary p-1 px-2">
            <SearchIcon />
        </button>
    </form>
</template>

<style scoped>
.transition-input {
    transition: width 0.5s ease;
};

</style>