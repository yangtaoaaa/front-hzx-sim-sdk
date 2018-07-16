<template>
    <div :class="$route.meta.hyalineGrounding?'page-home hyaline-grounding':'page-home'">
        <mt-header :title="customTitle || $route.meta.title" class="page-header" >
            <a @click="toBack" slot="left" v-if="$route.meta.showBack">
                <mt-button icon="back"></mt-button>
            </a>
            <router-link v-if="this.buildNumber >= 311 && $route.meta.rightLink" @click.native="rightLinkClick" :to="customrightLink || $route.meta.rightLink" slot="right">
                <mt-button v-if="customRightTitle || $route.meta.headerRightTitle" >{{customRightTitle || $route.meta.headerRightTitle}}</mt-button>
                <mt-button v-if="customRightIcon || $route.meta.headerRightIcon" :icon="customRightIcon || $route.meta.headerRightIcon"></mt-button>
                <div v-if="isShowRedPoint" class="serviceRedPoint"></div>
            </router-link>
            <router-link v-else-if="$route.meta.rightLink" :to="customrightLink || $route.meta.rightLink" slot="right">
                <mt-button v-if="customRightTitle || $route.meta.headerRightTitle" >{{customRightTitle || $route.meta.headerRightTitle}}</mt-button>
                <mt-button v-if="customRightIcon || $route.meta.headerRightIcon" :icon="customRightIcon || $route.meta.headerRightIcon"></mt-button>
                <div v-if="isShowRedPoint" class="serviceRedPoint"></div>
            </router-link>
        </mt-header>
        <div id="pageMain" class="page-main" ref="pageMain">
            <slot/>
        </div>
    </div>
</template>
<script>
import { Header, Button } from 'mint-ui'
import jsCookie from 'js-cookie'
export default {
    name: 'pageHome',
    components: {
        [Header.name]: Header,
        [Button.name]: Button
    },
    props: {
        value: null
    },
    data() {
        return {
            customTitle: null,
            customrightLink: null,
            customRightTitle: null,
            customRightIcon: null,
            backToHalfWindow: false,
            buildNumber: null,
            isShowRedPoint: false
        }
    },
    created() {
        document.getElementsByClassName('serviceRedPoint')[0].style.display = 'none'
    },
    watch: {
        $route($route) {
            if ($route.name === 'service') {
                this.getRedPoint()
            } else {
                this.isShowRedPoint = false
            }
            if ($route.name === 'appeals-success') {
                this.backToHalfWindow = true
            } else {
                this.backToHalfWindow = false
            }
            this.customTitle = null
            this.customrightLink = null
            this.customRightTitle = null
            this.customRightIcon = null
            const topValue = this.$scrollTopArr[$route.fullPath]
            if (topValue) {
                this.$nextTick(() => {
                    this.$refs.pageMain.scrollTop = topValue
                })
            } else {
                this.$refs.pageMain.scrollTop = 0
            }
        }
    },
    methods: {
        getRedPoint() {
            return new Promise((resolve, reject) => {
                this.$apis.getReadStatus({}, this, 'queryCancel1').then((res) => {
                    if (res.code === '000') {
                        if (!res.data) {
                            this.$jsBridge.callHandler('web_showRedPoint', {show: true})
                            this.isShowRedPoint = true
                            document.getElementsByClassName('serviceRedPoint')[0].style.display = ''
                        } else { // 全部已读
                            this.$jsBridge.callHandler('web_showRedPoint', {show: false})
                            this.isShowRedPoint = false
                            document.getElementsByClassName('serviceRedPoint')[0].style.display = 'none'
                        }
                    }
                })
            })
        },
        activated() {
            if (!this.buildNumber) {
                this.judgeBuildNumber()
            }
        },
        judgeBuildNumber() {
            var buildStr = jsCookie.get('buildNumber') && jsCookie.get('buildNumber').replace(/[^0-9]/ig, '')
            if (buildStr.length > 3) {
                buildStr = buildStr.substring(0, 3)
            }
            var buildInt = parseInt(buildStr)
            this.buildNumber = buildInt
        },
        rightLinkClick() {
            if (this.buildNumber >= 311) {
                // 如果当前页面是appeals-success，点击右侧按钮需要缩小页面
                if (this.backToHalfWindow === true) {
                    // 此处调用缩小页面jsb
                    this.$jsBridge.callHandler('web_closeWindow')
                }
            } else {
                this.$router.push('/service')
            }
        },
        toBack() {
            // 如果是最后一页，点击返回按钮需要缩小页面
            if (this.$route.path === '/service/appealsProcess') {
                if (!this.buildNumber) {
                    this.judgeBuildNumber()
                }
                if (this.buildNumber >= 311) {
                    this.$jsBridge.callHandler('web_closeWindow')
                    // 刷新页面防止cookie失效
                    window.location.reload()
                }
            }
            this.$router.go(-1)
        },
        changeTitle(name) {
            this.customTitle = name
        },
        changeRight({rightLink, rightTitle, rightIcon}) {
            this.customrightLink = rightLink
            this.customRightTitle = rightTitle
            this.customRightIcon = rightIcon
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import './page-home.scss';
</style>
