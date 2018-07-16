<template>
        <transition name="fade">
            <div class="sdk-toast" v-if="isShow">
                <div class="toast-main">
                    <div v-if="iconType" :class="'type icon-' + iconType"></div>
                    <p>
                        {{message}}
                    </p>
                </div>
            </div>
        </transition>
</template>

<script type="text/javascript">
export default {
    name: 'sdk-toast',
    data() {
        return {
            message: '',
            time: 3000,
            isShow: true,
            iconType: null,
            icon: null
        }
    },
    mounted() {
        this.close()
    },
    methods: {
        close() {
            var that = this
            window.setTimeout(function() {
                that.isShow = false
            }, this.time)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import './sdkToast.scss';
</style>
