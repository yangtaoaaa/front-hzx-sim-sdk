<template>
    <div class="upload-complain weui-cell weui-cell__bd">
        <p>{{this.item.label}}</p>
        <div v-if="imgBase64" class="review-pic">
            <img :src="imgBase64" />
            <div class="del-pic" @click='delImage'></div>
            <div v-if="uploading && percentCompleted !== null" class="upload-num">
                {{percentCompleted}}%
            </div>
        </div>
        <div v-else class="weui-cell__bd">
            <div class="upload-button">
                <div style="width:100%;height:100%" v-if="isIOS" @click="iosUploadPic"></div>
                <input v-else name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="uploadPic" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    props: {
        item: {
            type: Object
        },
        value: '',
        uploadUrl: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            imgBase64: null,
            doStart: false,
            uploading: false,
            dataValue: this.value,
            percentCompleted: 0,
            queryCancel: null
        }
    },
    watch: {
        dataValue(val) {
            this.$emit('input', val)
        },
        value(val) {
            this.dataValue = val
        }
    },
    components: {
    },
    computed: mapState({
        complainFormData: state => state.complain.complainFormData,
        isIOS: state => state.isIOS,
        isAndroid: state => state.isAndroid
    }),
    created() {
        if (this.complainFormData && this.complainFormData[this.item.id] !== null) {
            this.imgBase64 = this.complainFormData[this.item.id]
        }
    },
    methods: {
        delImage() {
            this.imgBase64 = null
            this.dataValue = ''
        },
        uploadPic(e) {
            let file = e.target.files[0]
            switch (file.type) {
            case 'image/jpg':
                break
            case 'image/png':
                break
            case 'image/jpeg':
                break
            case 'image/gif':
                break
            default:
                this.$sdkToast({
                    message: '不支持的图片类型'
                })
                return
            }
            let param = new FormData()  // 创建form对象
            param.append('file', file)  // 通过append向form对象添加数据
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    this.percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total) - 1
                }
            }
            // 图片显示
            const reader = new FileReader()
            reader.onload = (e) => {
                this.imgBase64 = e.target.result
            }
            reader.readAsDataURL(file)
            this.uploading = true
            this.doStart = true
            // 添加请求头
            this.queryCancel && this.queryCancel()
            this.$apis.uploadImg(param, config).then((res) => {
                this.percentCompleted = null
                if (res.code === '000') {
                    this.dataValue = res.data
                    this.uploading = false
                } else {
                    this.$sdkToast({
                        message: res.message
                    })
                }
            }).catch((error) => {
                this.uploading = false
                this.$sdkToast({
                    message: error
                })
            })
        },
        // 将以base64的图片url数据转换为Blob
        convertBase64UrlToBlob(urlData) {
            var binary = atob(urlData)
            var array = []
            for (var i = 0, len = binary.length; i < len; i++) {
                array.push(binary.charCodeAt(i))
            }
            return new Blob([new Uint8Array(array)], { type: 'image/jpeg' })
        },
        iosUploadPic() {
            this.$jsBridge.callHandler('web_uploadImage', {}, (base64Codes) => {
                base64Codes = base64Codes.replace(/\s/g, '')
                var formData = new FormData()
                formData.append('file', this.convertBase64UrlToBlob(base64Codes))
                let config = {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        this.percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total) - 1
                    }
                }
                // 图片显示
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.imgBase64 = 'data:image/png;base64,' + base64Codes
                }
                reader.readAsDataURL(this.convertBase64UrlToBlob(base64Codes))
                this.uploading = true
                this.doStart = true
                // 添加请求头
                this.queryCancel && this.queryCancel()
                this.$apis.uploadImg(formData, config).then((res) => {
                    this.percentCompleted = null
                    if (res.code === '000') {
                        this.dataValue = res.data
                        this.uploading = false
                    } else {
                        this.$sdkToast({
                            message: res.message
                        })
                    }
                }).catch((error) => {
                    this.uploading = false
                    this.$sdkToast({
                        message: error
                    })
                })
            })
        }
    }
}
</script>
<style lang="scss">
@import './uploader.scss';
</style>

