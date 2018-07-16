<template>
    <nav class="main-tabbar">
        <a class="tabbar-home" @click="tabbarChange(-1,'home')">
            <img src="../../assets/mainTabbar/icon_tabbar_cat.jpg" />
        </a>
        <a class="tabbar-nav" @click="tabbarChange(index, item.pathName)" v-for="(item, index) in navData" :key="index">
            <img :src="item.selected ? item.srcOpen: item.srcClose" />
            <div v-if="index==1" class="serviceRedPoint"></div>
            <!-- <img v-if="index==1" class="redPoint" /> -->
            <p :class="item.selected ? 'open' : 'close'">{{item.name}}</p>
        </a>
    </nav>
</template>
<script>
const giftPackageIcon = require('../../assets/mainTabbar/icon_tabbar_gift.jpg')
const giftPackageCloseIcon = require('../../assets/mainTabbar/icon_tabbar_gift.jpg')
const serviceIcon = require('../../assets/mainTabbar/icon_tabbar_service.jpg')
const serviceCloseIcon = require('../../assets/mainTabbar/icon_tabbar_service.jpg')
const toolIcon = require('../../assets/mainTabbar/icon_tabbar_tool.jpg')
const toolCloseIcon = require('../../assets/mainTabbar/icon_tabbar_tool.jpg')
// import { Badge } from 'mint-ui'
export default {
    name: 'main-tabbar',
    props: {
        value: null
    },
    data() {
        return {
            openTab: null,
            navData: [
                {
                    name: '礼包',
                    srcOpen: giftPackageIcon,
                    srcClose: giftPackageCloseIcon,
                    pathName: 'gift-package',
                    selected: false
                }, {
                    name: '客服',
                    srcOpen: serviceIcon,
                    srcClose: serviceCloseIcon,
                    pathName: 'service',
                    selected: false
                }, {
                    name: '更多',
                    srcOpen: toolIcon,
                    srcClose: toolCloseIcon,
                    pathName: 'tool',
                    selected: false
                }
            ]
        }
    },
    mounted() {
    },
    watch: {
    },
    methods: {
        tabbarChange(index, pageName) {
            for (let i = 0; i < this.navData.length; i++) {
                this.navData[i].selected = false
            }
            if (index >= 0) {
                this.navData[index].selected = true
            }
            this.$router.replace({name: pageName})
        },
        // ’-‘分割字符串转成驼峰
        tranformStr(str) {
            const re = /-(\w)/g
            return str.replace(re, function ($0, $1) {
                return $1.toUpperCase()
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import './main-tabbar.scss';
</style>
