<template>
    <RouterLink class="nav-link" to="/">
        <span style="font-size: .7em;" class="rounded-4 py-1 px-3 bg-secondary-subtle text-dark">
            <slot/>
        </span>
    </RouterLink>
</template>

<style scoped>
span:hover{
    cursor: pointer;
    opacity: .8;
}
</style>