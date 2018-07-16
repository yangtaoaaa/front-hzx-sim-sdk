<template>
    <div class="nickname">
        <div style="margin-top: .11rem;">
            <sdk-form-item placeholder="昵称" name="userName" data-vv-as="昵称" v-validate="'required|max:9'" pic-class-name="ic_edit" v-model="userName"></sdk-form-item>
        </div>
        <div class="submit-button">
            <sdk-button @click.native="saveUserName">完成</sdk-button>
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
            userName: null
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
@import 'nickname.scss';
</style>