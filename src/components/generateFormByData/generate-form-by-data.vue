<template>
    <div class="generate-form-by-data">
        <div class="form-group" title="">
            <div v-for="(item, index) in this.designFormData" :key="index">

                <div v-if="item.elementType==0">
                    <sdk-field :label="item.label" :maxLength="item.maxLength" :placeholder="item.tips" v-model="complainFormData[item.id]"></sdk-field>
                    <input :name="item.id" :maxLength="item.maxLength" :data-vv-as="item.label" type="hidden" v-model="complainFormData[item.id]" v-validate="item.requiredField==1?'required|noEmoji':'noEmoji'" />
                </div>

                <div v-else-if="item.elementType==3">
                    <sdk-field :label="item.label" :placeholder="item.tips" :disabled="true" v-model="complainFormData[item.id]" @click.native="openPicker(item.id)" :noClear="true"></sdk-field>
                    <mt-datetime-picker class="datetime-picker"
                        type="date"
                        v-model="dateValue"
                        :ref=" 'picker-'+ item.id"
                        @confirm="dateFormatAction"
                    >
                    </mt-datetime-picker>
                    <input :name="item.id" :data-vv-as="item.label" type="hidden" v-model="complainFormData[item.id]" v-validate="item.requiredField==1?'required':''" />
                </div>

                <div v-else-if="item.elementType==6" class="textarea-complain" >
                    <div class="textarea-box">
                        <p>{{item.label}}</p>
                        <sdk-field :placeholder="item.tips" type="textarea" :maxLength="item.maxLength" v-model="complainFormData[item.id]"></sdk-field>
                        <input :name="item.id" :data-vv-as="item.label" :maxlength="item.maxLength" type="hidden" v-model="complainFormData[item.id]" v-validate="item.requiredField==1?'required|noEmoji|minMax:'+item.minLength+','+item.maxLength:'noEmoji|minMax:'+item.minLength+','+item.maxLength" />
                    </div>
                </div>
                <div v-else-if="item.elementType==8">
                    <sdk-field :label="item.label" :placeholder="item.tips" v-model="complainFormData[item.id]" :disabled="true" @click.native="sheetVisible = !sheetVisible" :noClear="true"></sdk-field>
                    <mt-actionsheet
                        :actions="getOption(item)"
                        cancelText=''
                        v-model="sheetVisible"
                    >
                    </mt-actionsheet>
                    <input :name="item.id" :data-vv-as="item.label" type="hidden" v-model="complainFormData[item.id]" v-validate="item.requiredField==1?'required':''" />
                </div>
                <div v-else-if="item.elementType==10">
                    <uploader :item="item" v-model="complainFormData[item.id]"/>
                    <input :name="item.id" :data-vv-as="item.label" type="hidden" v-model="complainFormData[item.id]" v-validate="item.requiredField==1?'required':''" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Actionsheet, DatetimePicker } from 'mint-ui'
import uploader from '../uploader'
import sdkField from '../sdkField'

export default {
    name: 'generate-form-by-data',
    props: {
        designFormData: {
            type: Array,
            default: []
        }
    },
    components: {
        [DatetimePicker.name]: DatetimePicker,
        [Actionsheet.name]: Actionsheet,
        sdkField,
        uploader
    },
    data() {
        return {
            dateValue: new Date(),
            datePikerId: null,
            imgBase64: null,
            doStart: false,
            uploading: false,
            pickerVisible: false,
            sheetVisible: false
        }
    },
    computed: mapState({
        complainFormData: state => state.complain.complainFormData
    }),
    created() {
    },
    methods: {
        getOption(item) {
            const elementValueList = item.elementValue.split('|')
            const result = []
            elementValueList.map((i, num) => {
                result.push({
                    name: i,
                    method: (value) => {
                        this.complainFormData[item.id] = value.name
                    }
                })
            })
            return result
        },
        delImage() {
            this.imgBase64 = null
        },
        openPicker(id) {
            this.$refs['picker-' + id][0].open()
            this.datePikerId = id
        },
        // uploadPic(e) {
        //     let file = e.target.files[0]
        //     let param = new FormData()  // 创建form对象
        //     param.append('file', file)  // 通过append向form对象添加数据
        //     const self = this
        //     let config = {
        //         headers: {'Content-Type': 'multipart/form-data'},
        //         onUploadProgress: function (progressEvent) {
        //             self.uploading = false
        //         }
        //     }
        //     // 图片显示
        //     const reader = new FileReader()
        //     reader.onload = (e) => {
        //         this.imgBase64 = e.target.result
        //     }
        //     reader.readAsDataURL(file)
        //     this.uploading = true
        //     this.doStart = true
        //     // 添加请求头
        //     this.$store.dispatch('UPLOADPIC', {param, config}).then(function(data) {
        //     })
        // },
        toNext(path) {
            this.$validator.validateAll().then((result) => {
                if (!result) {
                    this.$sdkToast(this.errorBag.items[0].msg)
                } else {
                    this.$router.push({name: path})
                }
            })
        },
        dateFormat(val, index) {
            let year = val.getFullYear().toString()
            let month = val.getMonth() >= 9
                ? (val.getMonth() + 1).toString()
                : '0' + (val.getMonth() + 1)
            let date = val.getDate() >= 9
                ? val.getDate().toString()
                : '0' + val.getDate()
            this.complainFormData[index] = year + '-' + month + '-' + date
        },
        dateFormatAction(val) {
            let year = val.getFullYear().toString()
            let month = val.getMonth() >= 9
                ? (val.getMonth() + 1).toString()
                : '0' + (val.getMonth() + 1)
            let date = val.getDate() >= 9
                ? val.getDate().toString()
                : '0' + val.getDate()
            this.complainFormData[this.datePikerId] = year + '-' + month + '-' + date
            this.$store.commit('SET_COMPLAIN_FORM_DATA', {
                ...this.complainFormData
            })
            // this.complainFormData = {
            //     ...this.complainFormData
            // }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'generate-form-by-data.scss';
</style>
<style lang="scss" >
.generate-form-by-data {
    .textarea-complain{
        .mint-cell-wrapper{
            display: block;
        }
    }
    // .mint-popup-bottom{
    //     top: 40%;
    //     right: 0;
    //     bottom: 0;
    //     left: 1.36rem;
    //     transform: none;
    //     width: auto;
    // }
    .mint-cell-wrapper{
        font-size: .28rem;
    }
    input:disabled {
        background: #ffffff;
    }
    .mint-datetime-action{
        width: 100%;
    }
    .mint-datetime-cancel{
        display: none;
    }
    input:disabled {
        opacity: 1;
    }
}
</style>