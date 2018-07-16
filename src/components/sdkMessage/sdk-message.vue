<template>
    <transition name="fade">
        <div class="sdk-message" v-if="isShow">
            <div class="message-main">
                <p>
                    {{message}}
                </p>
                <div class="foot-btn">
                    <button v-if="cancelText" @click="cancel()">{{cancelText}}</button>
                    <button class="ok" @click="ok()">{{okText}}</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/javascript">
export default {
    name: 'sdk-message',
    data() {
        return {
            message: '',
            isShow: true,
            okText: '确定',
            cancelText: null,
            beforeOk: null,
            onOk: function () {
            },
            onCancel: function () {
            }
        }
    },
    props: {

    },
    mounted() {
        // this.close()
    },
    methods: {
        ok() {
            if (this.beforeOk) {
                this.beforeOk(() => {
                    this.isShow = false
                    this.onOk()
                })
            } else {
                this.isShow = false
                this.onOk()
            }
        },
        cancel() {
            this.isShow = false
            this.onCancel()
        }
    }
}
</script>

<style lang="scss" scoped>
    @import './sdk-message.scss';
</style>
