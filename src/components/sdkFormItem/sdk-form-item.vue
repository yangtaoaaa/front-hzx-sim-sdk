<template>
    <li class="sdk-form-item">
        <div v-if="picClassName" :class="['item-start', picClassName]"></div>
        <div class="item-bd">
            <input :maxlength="maxlength" :type="type" v-model="inputValue" :placeholder="placeholder" />
        </div>
        <a v-if="inputValue" @click="clearHandler" class="item-clear"></a>
    </li>
</template>

<script>
export default {
    name: 'sdk-form-item',
    components: {
    },
    data() {
        return {
            inputValue: this.value
        }
    },
    props: {
        type: {
            type: String,
            default: 'text'
        },
        picClassName: null,
        value: null,
        placeholder: null,
        maxlength: null
    },
    watch: {
        value(value) {
            this.inputValue = value
        },
        inputValue(inputValue) {
            this.$emit('input', inputValue)
        }
    },
    methods: {
        clearHandler() {
            this.inputValue = ''
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'sdk-form-item.scss';
</style>