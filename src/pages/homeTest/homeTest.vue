<template>
    <div class="homeTest">
        <ul class="sdk-cell">
            <li style="background-color: red;">
                <span class="cell-left">昵称</span>
                <label class="cell-right-label">label</label>
            </li>
            <li style="background-color: green;">
                <span class="cell-left">喵号</span>
                <span class="cell-right">无可用代金券</span>
            </li>
            <li style="background-color: red;">
                <span class="cell-left">账号</span>
                <span class="cell-right">无可用代金券</span>
            </li>
        </ul>
    </div>
    <!-- <div class="button-back-div">
        <a class="btn" style="background-color: blue;">专区说明</a>
        <a class="btn" style="background-color: red;">申请资格</a>
        <a class="btn" style="background-color: green;">兑换奖励</a>
        <a class="btn" style="background-color: blue;">下载游戏</a>
    </div> -->
</template>

<script>
import { mapState } from 'vuex'
import jsCookie from 'js-cookie'
export default {
    name: 'homeTest',
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
            this.isAfter311Build = true
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
@import 'homeTest.scss';
</style>
