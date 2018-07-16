<template>
    <div class="service">
        <div class="search-header">
            <input
                class="search-input"
                type="text"
                maxLength="20"
                v-model.trim="question"
                placeholder="搜索常见问题"
            />
            <mt-button class="search-btn" size="normal" @click="search">搜索</mt-button>
        </div>
        <div class="hot-question">
            <div class="hot-question-title">
                <label>常见问题</label>
                <label v-if="hotQuestion.length>=5" @click="toNormalQuestion" class="hot-question-more-link2">更多</label>
                <label v-else class="hot-question-more-link2"></label>
                <!-- <p @click="toNormalQuestion" class="hot-question-more-link">//v-else
                    <span>更多</span>  //style="display:none"
                    <img src="../../assets/icon-right.png">
                </p> -->
            </div>
            <div class="hotQuestion-item">
                <a v-for="item in hotQuestion" :key="item.faqId" @click="toDetail(item.faqId)">
                    • {{item.question}}
                </a>
            </div>
        </div>
        <div class="question-category">
            <h4>在线申诉</h4>
            <!-- <router-link :to="{ path: 'appealsProcess', query: {'categoryId':this.$route.query.categoryId}}"> -->
            <!-- <router-link class="category-item" v-for="item in category" :key="item.id" :to="{ name: 'question-search', query: { 'hiddenSearch': true ,'title':item.name,'categoryId':item.id}}"> -->
            <!-- <router-link class="category-item" v-for="item in category" :key="item.id" :to="{ name: 'appeals-process', query: { 'title':item.name,'categoryId':item.id}}">
                <img :src="item.icon||''">
                <p>{{item.name}}</p>
            </router-link> -->
            <div class="category-item" @click="displayFullScreen(item.name,item.id)" v-for="item in category" :key="item.id">
                <img :src="item.icon||''">
                <p>{{item.name}}</p>
            </div>
        </div>
        <div class="wechat">
            <h4>微信公众号</h4>
            <img id="qrImg" @touchstart="saveImg" @touchend='clearLoop' src="../../assets/icon_tabbar_cat.jpg">
            <p>(长按二维码保存至相册)</p>
            <mt-button class="wechat-btn" size="normal" v-if="this.buildNumber >= 311" @click="goToWeChat">点击前往微信关注游戏猫</mt-button>
            <!-- <mt-button type="primary" size="small" @click="goToWeChat">复制“游戏猫”进入微信添加公众号</mt-button> -->
        </div>
    </div>
</template>

<script>
import { Button } from 'mint-ui'
import jsCookie from 'js-cookie'
export default {
    name: 'service',
    components: {
        [Button.name]: Button
    },
    created() {
        this.init()
    },
    activated() {
        this.question = ''
        if (!this.buildNumber) {
            this.judgeBuildNumber()
        }
        // if (this.buildNumber >= 311) {
        //     document.getElementsByClassName('main-tabbar')[0].style.display = ''
        // }
    },
    data() {
        return {
            category: [],
            hotQuestion: [],
            question: null,
            queryCancel1: null,
            queryCancel2: null,
            imgData: null,
            jieguo: null,
            buildNumber: null
        }
    },
    methods: {
        displayFullScreen(name, id) {
            // 311以下的版本直接跳转，以上就调jsbridge
            if (!this.buildNumber) {
                this.judgeBuildNumber()
            }
            if (this.buildNumber < 311) {
                this.$router.push({name: 'appeals-process', query: {'title': name, 'categoryId': id}})
            } else {
                let url = window.location.origin + '/#/service/appealsProcess?title=' + name + '&categoryId=' + id
                this.$jsBridge.callHandler('web_openNewPage', { url: url, vertical: true })
            }
        },
        saveImg() {
            if (this.Loop) {
                clearInterval(this.Loop)
            }
            if (!this.buildNumber) {
                this.judgeBuildNumber()
            }
            var that = this
            this.Loop = setTimeout(function() {
                if (that.buildNumber < 311) {
                    that.$jsBridge.callHandler('web_screenshots', null, (res) => {
                        this.$sdkToast({
                            message: '保存成功'
                        })
                    })
                } else {
                    let imgUrl = document.getElementById('qrImg').src
                    that.$jsBridge.callHandler('web_downloadImage', {'url': imgUrl})
                }
            }, 800)
        },
        judgeBuildNumber() {
            var buildStr = jsCookie.get('buildNumber') && jsCookie.get('buildNumber').replace(/[^0-9]/ig, '')
            if (buildStr.length > 3) {
                buildStr = buildStr.substring(0, 3)
            }
            var buildInt = parseInt(buildStr)
            this.buildNumber = buildInt
        },
        clearLoop() {
            clearInterval(this.Loop)
        },
        init() {
            const loading = this.$loading()
            Promise.all([
                this.listCategory(), this.listHotFaq()
            ]).then(result => {
                loading.close()
            }).then(result => {
                loading.close()
            })
        },
        // 获取问题分类
        listCategory() {
            this.queryCancel1 && this.queryCancel1()
            return new Promise((resolve, reject) => {
                this.$apis.listCategory({searchStatus: 1}, this, 'queryCancel1').then((res) => {
                    if (res.code === '000') {
                        this.category = res.data
                    } else {
                        this.$sdkToast({
                            message: res.message
                        })
                    }
                    resolve()
                }).catch((error) => {
                    this.$sdkToast({
                        message: error
                    })
                    reject()
                })
            })
        },
        // 常见问题
        listHotFaq() {
            this.queryCancel2 && this.queryCancel2()
            return new Promise((resolve, reject) => {
                this.$apis.listHotFaq({}, this, 'queryCancel2').then((res) => {
                    if (res.code === '000') {
                        this.hotQuestion = res.data.splice(0, 5)
                    } else {
                        this.$sdkToast({
                            message: res.message
                        })
                    }
                    resolve()
                }).catch((error) => {
                    this.$sdkToast({
                        message: error
                    })
                    reject()
                })
            })
        },
        // 搜索
        search() {
            if (this.question) {
                this.$router.push({ name: 'question-search', query: { 'question': this.question } })
            }
        },

        // 常见问题
        toNormalQuestion() {
            this.$router.push({ name: 'normal-question' })
        },

        toDetail(id) {
            this.$router.push({ name: 'question-detail', query: { 'questionId': id } })
        },
        // 跳转到微信
        goToWeChat() {
            this.$jsBridge.callHandler('web_openLocalApp', {url: 'weixin://'})
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'service.scss';

</style>
