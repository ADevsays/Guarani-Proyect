<script lang="ts">
import {defineComponent} from "vue";
import type {PropType} from "vue";
import {RouteLocationRaw} from 'vue-router';

export default defineComponent({
    props:{
        text:String, 
        path: {type: String as PropType<RouteLocationRaw>, required:true}
    }
})
</script>
<template>
    <div class="d-flex mt-2" style="font-size: 12px;">
        <p>{{text}}</p>
        <RouterLink class="nav-link text-primary ms-2" :to="path">
            <slot/>
        </RouterLink>
    </div>
</template>