<template>
    <ul class="sdk-form">
        <slot></slot>
    </ul>
</template>

<script>
export default {
    name: 'sdk-form',
    components: {
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'sdk-form.scss';
</style>