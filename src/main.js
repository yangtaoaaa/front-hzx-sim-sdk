// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register(`${window.resourceBaseUrl}service-worker.js`)
// }
(function (w) {
    function initFontSize(w) {
        const c = document.documentElement.getBoundingClientRect()
        let cw
        if (c.width > w) {
            cw = w
        } else {
            cw = c.width
        }
        document.documentElement.style.fontSize = cw / w * 100 + 'px'
    }
    initFontSize(w)
    window.onresize = () => {
        initFontSize(w)
    }
}(750))

// import 'babel-polyfill'
const isApp = navigator.userAgent.indexOf('gamecat') > -1
if (isApp) {
    require('./js/WebViewJavascriptBridge')
}

import './js/config'
import './js/init-cookie'
import './js/public-path'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import getStore from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import apis from './fetch/apis'
import sdkLoading from './components/sdkLoading'
import sdkToast from './components/sdkToast'
import sdkMessage from './components/sdkMessage'
import VeeValidate from 'vee-validate'
import 'mint-ui/lib/style.css'
import moment from 'moment'
(async () => {
    if (isApp) {
        Vue.prototype.$jsBridge = window.WebViewJavascriptBridge
    }
    // 修改默认错误提示
    const dictionary = {
        zh_CN: {
            messages: {
                required: (field) => `${field}不能为空`,
                numeric: (field) => `${field}必须是数字`,
                between: (field, data) => `${field}必须是${data[0]}~${data[1]}位数之间`,
                max: (field, data) => `${field}最大位数不能超过${data[0]}`,
                min: (field, data) => `${field}最小位数不能小于${data[0]}`,
                digits: (field, data) => `${field}必须是长度为${data[0]}的数字`,
                min_value: (field, data) => `${field}最小值不能小于${data[0]}`,
                max_value: (field, data) => `${field}最大值不能超过${data[0]}`,
                not_in: (field, data) => `${field}不能包含${data.join(',')}`,
                confirmed: (field, data) => `${field}不匹配`
            }
        }
    }
    Vue.use(VeeValidate, {
        locale: 'zh_CN',
        fieldsBagName: 'error',
        errorBagName: 'errorBag',
        events: 'blur',
        dictionary
    })

    const { Validator } = VeeValidate

    // 密码校验
    Validator.extend('sdkPassword', {
        getMessage: field => `${field}格式不正确`,
        validate: value => {
            const len = value.length
            return len > 5 && len < 19
        }
    })
    // 手机号码
    Validator.extend('mobile', {
        getMessage: field => `${field}格式不正确`,
        validate: value => {
            return /^1\d{10}$/.test(value)
        }
    })
    // 特殊字符校验
    Validator.extend('noEmoji', {
        getMessage: field => `${field}不能含有表情`,
        validate: value => {
            return !/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\ud83D[\uDE80-\uDEff]/g.test(value)
        }
    })
    // 字符长度校验
    Validator.extend('minMax', {
        getMessage: (field, data) => `${field}` + '长度必须在' + `${data[0]}~${data[1]}` + '之间',
        validate: (value, data) => {
            const len = value.length
            return len >= parseInt(data[0]) && len <= parseInt(data[1])
        }
    })

    Vue.prototype.$moment = moment
    // swiper轮播插件
    Vue.use(VueAwesomeSwiper)
    // vue路由插件
    Vue.use(VueRouter)
    // loading
    Vue.use(sdkLoading)
    // 提示
    // Vue.component(sdkToast.name, sdkToast)
    Vue.prototype.$sdkToast = sdkToast
    // 弹窗
    Vue.use(sdkMessage)

    const routes = require('./routes.js')

    const routerConfigure = {
        routes
    }
    if (window.isHistoryMode) {
        routerConfigure.mode = 'history'
        routerConfigure.base = '/view/'
    }
    // 初始化路由配置
    const router = new VueRouter(routerConfigure)
    // 初始化 接口api
    Vue.prototype.$apis = apis(window.baseUrl, router)
    // 初始化vuex store
    const store = getStore(Vue, router)
    // FastClick.attach(document.body)
    /* eslint-disable no-new */
    new Vue({
        store,
        router,
        render: h => h(App)
    }).$mount('#app-box')

    // 记录每次页面离开时的scrollTop值
    const scrollTopArr = {}
    Vue.prototype.$scrollTopArr = scrollTopArr
    // 页面跳转前
    let mainTag
    router.beforeEach(function (to, from, next) {
        sdkMessage.close()
        sdkLoading.close()
        !mainTag && (mainTag = document.getElementById('pageMain'))
        mainTag && (scrollTopArr[from.fullPath] = mainTag.scrollTop)
        next()
    })

    // 页面跳转后
    router.afterEach(function (to) {
        if (isApp && to.meta) {
            const params = {
                method: to.meta.level === 0 ? 'main_menu' : 'second_menu',
                param: {
                    path: to.path,
                    title: to.meta.title
                }
            }
            if (to.meta.parentTitle) {
                params.param.parentTitle = to.meta.parentTitle
            }
            Vue.prototype.$jsBridge.callHandler('web_statistic', params)
        }
    })
})()
