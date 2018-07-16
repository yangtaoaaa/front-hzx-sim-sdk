const sdkLoading = require('./sdk-loading.vue')
const loading = {
    install(Vue, options) {
        const el = new Vue({
            render: h => h(sdkLoading)
        }).$mount().$el
        Vue.prototype.$loading = () => {
            this.close()
            document.body.appendChild(el)
            return {
                close: () => {
                    el.parentElement && el.parentElement.removeChild(el)
                }
            }
        }
    },
    close() {
        const loadDoms = document.getElementsByClassName('sdk-loading')
        if (loadDoms.length > 0) {
            for (let i = 0, loadDomsLen = loadDoms.length; i < loadDomsLen; i++) {
                const element = loadDoms[i]
                element.remove()
            }
        }
    }
}
export default loading