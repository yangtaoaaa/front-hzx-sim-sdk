<template>
    <div class="home">
        <ul class="sdk-cell">
            <li>
                <router-link to="/nickname" class="cell-link">
                    <span class="cell-left">昵称</span>
                    <span class="cell-right">{{userInfo.userName}}</span>
                </router-link>
                <!-- <span class="cell-left">昵称</span>
                <router-link to="/nickname" class="cell-right">{{userInfo.userName}}</router-link> -->
            </li>
        </ul>
        <ul class="sdk-cell">
            <li>
                <router-link to="/test" class="cell-link">
                    <span class="cell-left">测试</span>
                    <span class="cell-right">学习CSS</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import jsCookie from 'js-cookie'
export default {
    name: 'home',
    data() {
        return {
            shortBuildNumber: null,
            buildNumber: jsCookie.get('buildNumber'),
            isHighBuild: false
        }
    },
    created() {
        this.$store.dispatch('getUserInfo')
        this.$store.dispatch('getAcctInfo')
        document.getElementsByClassName('serviceRedPoint')[0].style.display = 'none'
    },
    activated() {
        this.question = ''
        if (!this.shortBuildNumber) {
            this.judgeBuildNumber()
        }
        if (this.shortBuildNumber >= 311) {
            this.isHighBuild = true
        }
        this.getRedPoint()
    },
    computed: mapState({
        userInfo: state => state.user.userInfo,
        acctInfo: state => state.user.acctInfo
    }),
    components: {
    },
    methods: {
        judgeBuildNumber() {
            var buildStr = jsCookie.get('buildNumber') && jsCookie.get('buildNumber').replace(/[^0-9]/ig, '')
            if (buildStr.length > 3) {
                buildStr = buildStr.substring(0, 3)
            }
            var buildInt = parseInt(buildStr)
            this.shortBuildNumber = buildInt
        },
        getRedPoint() {
            return new Promise((resolve, reject) => {
                this.$apis.getReadStatus({}, this, 'queryCancel1').then((res) => {
                    if (res.code === '000') {
                        if (!res.data) {
                            this.$jsBridge.callHandler('web_showRedPoint', {show: true})
                            document.getElementsByClassName('serviceRedPoint')[0].style.display = ''
                        } else { // 全部已读
                            this.$jsBridge.callHandler('web_showRedPoint', {show: false})
                            document.getElementsByClassName('serviceRedPoint')[0].style.display = 'none'
                        }
                    }
                })
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'home-modify.scss';
</style>
