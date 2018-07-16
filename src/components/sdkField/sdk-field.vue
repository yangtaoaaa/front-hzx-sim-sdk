<template>
    <li class="sdk-field">
        <div v-if="label" class="item-label">{{label}}</div>
        <div class="item-bd">
            <input v-if="type != 'textarea'" :maxLength="maxLength" :type="type" v-model="inputValue" :placeholder="placeholder" :disabled="disabled"/>
            <textarea v-if="type == 'textarea'" :maxLength="maxLength" rows="3" cols="20" v-model="inputValue" :placeholder="placeholder"/>
        </div>
        <a v-if="type != 'textarea' && inputValue && !noClear" @click="clearHandler" class="item-clear"></a>
    </li>
</template>

<script>
export default {
    name: 'sdk-field',
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
        label: {
            type: String,
            default: null
        },
        placeholder: null,
        value: null,
        noClear: false,
        disabled: true,
        maxLength: null
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
@import 'sdk-field.scss';
</style>