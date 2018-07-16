<template>
    <div v-if="isHighBuildNumber" id="appHigh">
        <div  v-if="$route.meta && $route.meta.fullApp">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <div class="wrapper" v-else v-show="show">
            <MainTabbar/>
            <transition name="fade">
                <PageHome>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </PageHome>
            </transition>
        </div>
    </div>
    <div v-else id="app">
        <div  v-if="$route.meta && $route.meta.fullApp">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <div class="wrapper" v-else v-show="show">
            <MainTabbar/>
            <transition name="fade">
                <PageHome>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </PageHome>
            </transition>
        </div>
    </div>
</template>
<script>
import { Button } from 'mint-ui'
import MainTabbar from './components/mainTabbar'
import PageHome from './components/pageHome'
import jsCookie from 'js-cookie'
export default {
    data() {
        return {
            show: false,
            buildNumber: null,
            isHighBuildNumber: false
        }
    },
    created() {
        this.$jsBridge && this.$jsBridge.registerHandler('app_accountUpdate', () => {
            this.$store.dispatch('getAcctInfo', true)
        })
        if (!this.buildNumber) {
            this.judgeBuildNumber()
        }
        if (this.buildNumber >= 311) {
            this.isHighBuildNumber = true
        }
    },
    mounted() {
        // 安卓端显示问题
        setTimeout(() => {
            this.show = true
        }, 800)
    },
    components: {
        [Button.name]: Button,
        MainTabbar,
        PageHome
    },
    methods: {
        judgeBuildNumber() {
            var buildStr = jsCookie.get('buildNumber') && jsCookie.get('buildNumber').replace(/[^0-9]/ig, '')
            if (buildStr.length > 3) {
                buildStr = buildStr.substring(0, 3)
            }
            var buildInt = parseInt(buildStr)
            this.buildNumber = buildInt
        }
    }
}
</script>

<style lang="scss">
@import './App.scss';
</style>
