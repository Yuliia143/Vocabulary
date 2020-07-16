<template>
    <div id="app">
        <app-header/>
        <router-view></router-view>
    </div>
</template>

<script>
    import AppHeader from "./components/AppHeader";

    export default {
        name: 'App',
        components: {AppHeader},
    }
</script>

<style scoped lang="scss">
    #app {
        position: relative;
        height: 100vh;
        width: 100vw;
    }
</style>
