<template>
    <div id="app">
        <v-main-wrapper></v-main-wrapper>
    </div>
</template>

<script lang="ts">
import vMainWrapper from './views/v-main-wrapper.vue';
export default {
    name: 'app',
    components: {
        vMainWrapper
    }
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

body {
    background-color: #4a4a4a !important;
}
</style>
