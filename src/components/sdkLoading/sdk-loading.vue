<template>
    <div class="sdk-loading" v-if="isHighBuildNumber && isHiddenTabbar" style="left: 0rem;">
        <div class="loading-main">
            <div class="loading-panel">
                <div class="loading-img">
                </div>
                <p>加载中...</p>
            </div>
        </div>
    </div>
    <div class="sdk-loading" v-else style="left: 1.36rem;">
        <div class="loading-main">
            <div class="loading-panel">
                <div class="loading-img">
                </div>
                <p>加载中...</p>
            </div>
        </div>
    </div>
</template>
<script>
import jsCookie from 'js-cookie'
export default {
    data() {
        return {
            buildNumber: null,
            isHighBuildNumber: false,
            isHiddenTabbar: false
        }
    },
    watch: {
        $route($route) {
            if ($route.name === 'appeals-process') {
                alert('all screen!')
            }
        }
    },
    activated() {
        if (document.getElementsByClassName('main-tabbar')[0].style.display === 'none') {
            this.isHiddenTabbar = true
        }
    },
    created() {
        if (!this.buildNumber) {
            this.judgeBuildNumber()
        }
        if (this.buildNumber >= 311) {
            this.isHighBuildNumber = true
        }
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scope>
    @import './sdk-loading.scss';
</style>