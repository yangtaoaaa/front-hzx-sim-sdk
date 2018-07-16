import Vue from 'vue'
import Vuex from 'vuex'
import complain from './modules/complain'
import user from './modules/user'

Vue.use(Vuex)
// store初始化
const ua = navigator.userAgent
const getStore = function (Vue, router) {
    const store = new Vuex.Store({
        state: {
            // MtaH5,
            $apis: Vue.prototype.$apis,
            $loading: Vue.prototype.$loading,
            $sdkToast: Vue.prototype.$sdkToast,
            pageState: 1,
            isApp: ua.indexOf('gamecat') > -1,
            isWeixin: ua.indexOf('MicroMessenger') > -1,
            isQq: ua.indexOf('QQ') > -1,
            isAndroid: ua.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1,
            isBaiduBoxApp: ua.indexOf('BaiduBoxApp') > -1,
            isIOS: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        },
        mutations: {
        },
        modules: {
            complain,
            user
        }
    })
    // if (module.hot) {
    //     module.hot.accept([
    //         './modules/complain'
    //     ], () => {
    //         const complain = require('./modules/complain').default
    //         store.hotUpdate({
    //             modules: {
    //                 complain
    //             }
    //         })
    //     })
    // }
    return store
}
export default getStore
