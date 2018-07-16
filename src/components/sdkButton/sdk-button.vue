<template>
    <button class="sdk-button">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'sdk-button',
    components: {
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'sdk-button.scss';
</style>