<template>
    <div class="loading">
        <span></span>
    </div>
</template>

<script lang="ts">
export default {
    name: 'v-loading'
};
</script>

<style lang="scss" scoped>
// TODO: Finish the styling for loading and connect to rest of the front
.loading {
    top: 0;
    z-index: 101;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    span {
        display: block;
        width: 60px;
        height: 60px;
        margin: 0 auto;
        border: 3px solid transparent;
        border-top-color: #2fac66;
        border-bottom-color: #2fac66;
        border-radius: 50%;
        animation: spin ease 1000ms infinite;
    }
}
</style>
