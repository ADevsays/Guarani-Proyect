<script setup lang="ts">
import LinkIcon from './LinkIcon.vue';
import HouseIcon from '../SVG/HouseIcon.vue';
import ReportIcon from '../SVG/ReportIcon.vue';
import MoneyIcon from '../SVG/MoneyIcon.vue';

</script>
<template>
    <div class="d-flex justify-content-evenly p-3 pt-0 mt-4 flex-wrap">
        <LinkIcon to="/" bg="bg-primary" text="Volver">
            <HouseIcon/>
        </LinkIcon>
        <LinkIcon to="/reportes" bg="bg-danger" text="Reportar">
            <ReportIcon/>
        </LinkIcon>
        <LinkIcon to="/donar" bg="bg-success" text="Donar">
            <MoneyIcon/>
        </LinkIcon>
    </div>
</template>