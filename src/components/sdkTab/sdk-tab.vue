<template>
    <div class="sdk-tab">
        <div class="sdk-tab-main">
            <slot></slot>
        </div>
        <i class="sdk-tab-bar" :style="{
            width: `${barWidth}%`,
            left: `${barIndex * barWidth}%`
        }"></i>
    </div>
</template>

<script>
export default {
    name: 'sdk-tab',
    props: {
        value: null
    },
    data() {
        return {
            dataValue: this.value,
            barWidth: 0,
            barIndex: 0,
            itemNumber: 0
        }
    },
    watch: {
        value(value) {
            this.dataValue = value
        },
        dataValue(dataValue) {
            this.$emit('input', dataValue)
            this.$emit('sdk-change')
            this.$nextTick(() => {
                this.changeBar()
            })
        },
        $slots() {
            this.changeBar()
        }
    },
    mounted() {
        this.changeBar()
    },
    components: {
    },
    methods: {
        changeBar() {
            const slots = this.$slots.default
            if (slots) {
                this.itemNumber = 0
                let idx = 0
                let isSet = false
                slots.forEach((item) => {
                    if (item.child) {
                        this.itemNumber++
                        if (!isSet) {
                            if (item.child.index === this.dataValue) {
                                isSet = true
                                this.barIndex = idx
                            }
                            idx++
                        }
                    }
                })
                this.barWidth = 100 / this.itemNumber
            }
        },
        tabHandler(index) {
            this.dataValue = index
            this.changeBar()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'sdk-tab.scss';
</style>