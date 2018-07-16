import SdkToast from './sdkToast.vue'
import Vue from 'vue'
SdkToast.install = function(options) {
    if (options === undefined || options === null) {
        options = {
            message: ''
        }
    } else if (typeof options === 'string' || typeof options === 'number') {
        options = {
            message: options
        }
    }
    var Toast = Vue.extend(SdkToast)
    var component = new Toast({
        data: options
    }).$mount()
    document.querySelector('body').appendChild(component.$el)
}
export default SdkToast.install
