<template>
    <a @click="$parent.tabHandler(index)" slot-scope="scope" class="sdk-tab-item" :class="{
        active: index === $parent.value
    }">
        <slot />
    </a>
</template>

<script>
export default {
    name: 'sdk-tab-item',
    mounted() {
    },
    props: {
        index: null
    },
    components: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'sdk-tab-item.scss';
</style>