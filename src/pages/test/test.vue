<template>
    <div class="test">
        <div class="myWidthDiv">{{myWidth}}</div>
        <div class="div1">
            <div class="flowTest">
                <p>让我掉下眼泪的 不止昨夜的酒 让我依依不舍的 不止你的温柔 余路还要走多久 我是最后一个</p>
                <!-- <p>让我依依不舍的 不止你的温柔</p>
                <p>余路还要走多久 你攥着我的手</p>
                <p>让我感到为难的 是挣扎的自由</p>
                <p>成都 带不走的 只有你</p>
                <p>和我在成都的街头走一走</p>
                <p>直到所有的灯都熄灭了也不停留</p>
                <p>你会挽着我的衣袖 我会把手揣进裤兜</p>
                <p>走到玉林路的尽头 坐在(走过)小酒馆的门口</p>
                <p>我是最后一个</p> -->
            </div>
        </div>
    </div>
</template>

<script>
import SdkForm from '@/components/sdkForm'
import SdkFormItem from '@/components/sdkFormItem'
import SdkButton from '@/components/sdkButton'

export default {
    name: 'nickname',
    data() {
        return {
            userName: null,
            myWidth: null
        }
    },
    mounted() {
        const that = this
        window.onresize = () => {
            return (() => {
                window.fullWidth = document.documentElement.clientWidth
                that.myWidth = parseInt(window.fullWidth)
            })()
        }
    },
    async activated() {
        const userInfo = await this.$store.dispatch('getUserInfo')
        this.userName = userInfo.userName
    },
    components: {
        SdkForm,
        SdkFormItem,
        SdkButton
    },
    methods: {
        // 保存用户姓名
        async saveUserName() {
            const valid = await this.$validator.validateAll()
            if (valid) {
                // 发起昵称修改请求
                const loading = this.$loading()
                const res = await this.$apis.editUserInfo({
                    userName: this.userName
                })
                loading.close()
                if (res.code === '000') {
                    // 更新个人信息
                    await this.$store.dispatch('getUserInfo', true)
                    // 返回个人首页
                    this.$router.back()
                } else {
                    this.$sdkToast({
                        message: res.message
                    })
                }
            } else {
                this.$sdkToast({
                    message: this.errorBag.all()[0]
                })
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'test.scss';
</style>