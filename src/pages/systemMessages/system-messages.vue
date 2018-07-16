<template>
    <div class="system-messages">
        <!-- 下拉刷新设置 -->
        <pull-to v-if="dataList && dataList.length"  :wrapper-height="wrapperHeight" :top-load-method="loadTop" @infinite-scroll="loadBottom">
            <ul class="message-list">
                <li v-for="(item, index) in dataList" :key="index"  @click="pushLink(item)">
                    <span>{{item.messageTitle}}</span>
                </li>
            </ul>
            <!-- <div class="loading-bar">
                {{hasNext ? loadText : '没有更多数据了~'}}
            </div> -->
        </pull-to>
        <div v-if="!dataList || !dataList.length"  class="system-container">
            <img src="../../assets/icon_tabbar_cat.jpg" />
            <p>暂无系统消息</p>
        </div>
    </div>
</template>

<script>
import PullTo from '@/js/vue-pull-to/src'

export default {
    name: 'system-messages',
    data() {
        return {
            loadText: '上拉加载',
            queryCancel: null,
            dataList: null,
            hasNext: false,
            pageNo: 1,
            wrapperHeight: null
        }
    },
    activated() {
        this.queryMessage(1)
    },
    mounted() {
        this.wrapperHeight = document.body.offsetHeight - document.querySelector('.page-header').offsetHeight + 'px'
    },
    components: {
        PullTo
    },
    methods: {
        pushLink(item) {
            this.$router.push(`systemMessages/${item.messageId}`)
        },
        async loadTop(loaded) {
            await this.queryMessage(1)
            loaded('done')
        },
        async loadBottom() {
            if (this.hasNext) {
                this.loadText = '加载中...'
                await this.queryMessage()
                this.loadText = '上拉加载'
            }
        },
        async queryMessage(reload) {
            let loading
            if (!this.dataList) {
                loading = this.$loading()
            }
            this.queryCancel && this.queryCancel()
            if (reload) {
                this.pageNo = 1
            }
            const res = await this.$apis.listGameMessage({'currentPage': this.pageNo}, this, 'queryCancel')
            loading && loading.close()
            if (res.code === '000') {
                this.pageNo++
                if (reload) {
                    this.dataList = res.data.list
                } else {
                    this.dataList = this.dataList.concat(res.data.list)
                }
                this.hasNext = res.data.hasNext
            } else {
                this.$sdkToast(res.message)
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'system-messages.scss';
</style>