<template>
    <div class="tool">
        <ul class="buttons-ul">
            <li>
                <router-link :to="{ name: 'system-messages'}">
                    <div class="system-messages-img"></div>
                    <p>系统消息</p>
                </router-link>
            </li>
            <li >
                <router-link :to="{ name: 'auth'}">
                    <div class="auth-img" ></div>
                    <p>实名认证</p>
                </router-link>
            </li>
            <!-- <li >
                <router-link :to="{ name: 'play-pay'}">
                    <div class="play-pay-img" ></div>
                    <p>玩呗</p>
                </router-link>
            </li> -->
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userName: null,
                IDCard: null
            }
        },
        activated() {

        },
        methods: {
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'tool.scss';
</style>