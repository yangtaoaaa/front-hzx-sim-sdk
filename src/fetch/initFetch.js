import axios from 'axios'
const CancelToken = axios.CancelToken

// 公共配置
export const init = (baseURL, router, jsBri) => {
    const instance = axios.create({
        // 设置超时时间
        timeout: 30000,
        // 请求的baseUrl
        baseURL: baseURL,
        // 请求头部信息
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // 请求参数转换
        transformRequest: [function (data, headers) {
            if (data instanceof FormData) {
                return data
            }
            let ret = ''
            for (let it in data) {
                if (ret !== '') ret += '&'
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
            }
            return ret
        }],
        // cors跨域请求带上配置
        withCredentials: true
    })
    instance.interceptors.response.use((res) => {
        // if (res.data.code === '201') {
        //     sessionStorage.clear()
        //     router.replace('/404?unlogin=true')
        //     return {
        //         code: '201',
        //         message: '未登录'
        //     }
        // }
        // if (!res) {
        //     return {
        //         code: '500',
        //         message: '请求错误，请重试！'
        //     }
        // }
        if (Object.keys(res.data).length === 0) {
            return Promise.resolve({
                code: '500',
                message: '请求错误，请重试！'
            })
        }
        if (res.data.code === 201 || res.data.code === '201' || res.data.code === '002') {
            if (window.WebViewJavascriptBridge) {
                window.WebViewJavascriptBridge.callHandler('web_tokenExpired')
            } else {
                return Promise.resolve(res.data)
            }
        } else {
            return Promise.resolve(res.data)
        }
    }, (error) => {
        return Promise.reject(error)
    })
    return instance
}
export const httpCancel = (config, $this, cancel) => {
    if ($this) {
        config.cancelToken = new CancelToken(function executor(c) {
            $this[cancel] = c
        })
    }
}