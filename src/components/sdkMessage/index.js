const message = {
    install(vue, options) {
        if (options === undefined || options === null) {
            options = {
                message: ''
            }
        } else if (typeof options === 'string' || typeof options === 'number') {
            options = {
                message: options
            }
        }
        const SdkMessage = vue.extend(require('./sdk-message.vue'))
        vue.prototype.$sdkMessage = (options) => {
            var component = new SdkMessage({data: options}).$mount()
            document.querySelector('body').appendChild(component.$el)
        }
    },
    close() {
        const doms = document.getElementsByClassName('sdk-message')
        if (doms.length > 0) {
            for (let i = 0, domsLen = doms.length; i < domsLen; i++) {
                doms[i].remove()
            }
        }
    }
}
export default message
