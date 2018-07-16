/**
 * 申诉相关 store 配置
 */

const state = {
    // 平台类型
    osTypes: [
        { key: 1, value: 'iOS企业' },
        { key: 3, value: 'iOS正版' },
        { key: 2, value: '安卓' }
    ],
    // 申诉表单
    complainFormData: {},
    // 是否需要填写游戏材料 0不需要1需要
    needGameMaterial: 1,
    // 是否需要填写联系方式 0不需要1需要
    needContactType: 1,
    // 申诉表单数据已获取
    appealsProcessIsOk: false,
    // 申诉详情
    onlineAppealDetail: {}
}

const mutations = {

    // 获取申诉详情
    SET_ONLINE_APPEAL_DETAIL(state, data) {
        state.onlineAppealDetail = data
    },
    // 保存是否需要填写游戏材料
    SET_NEED_GAME_MATERIAL(state, data) {
        state.needGameMaterial = data
    },
    // 保存是否需要填写联系方式
    SET_NEED_CONTACT_TYPE(state, data) {
        state.needContactType = data
    },
    // 保存申诉数据
    SET_COMPLAIN_FORM_DATA(state, data) {
        state.complainFormData = data
    },
    // 申诉表单数据已获取
    APPEALS_PROCESS_ISOK(state, data) {
        state.appealsProcessIsOk = data
    }
}

// 请求
const actions = {
    // 获取申诉查询结果
    GET_ONLINE_APPEAL_DETAIL({ state, commit, rootState }, params) {
        // commit('UPDATE_LOADING_STATUS', true)
        return new Promise(function (resolve, reject) {
            rootState.http.post('GET_ONLINE_APPEAL_DETAIL', params).then(function (res) {
                commit('UPDATE_LOADING_STATUS', false)
                if (res.code !== '200' && res.code !== '000') {
                    commit('SHOW_ERROR_TOAST', res)
                    return false
                }
                resolve(res.data)
            }).catch((error) => {
                reject(error)
                commit('SHOW_ERROR_TOAST', error)
                commit('UPDATE_LOADING_STATUS', false)
            })
        })
    },
    // 获取申诉表单项
    GET_ONLINE_APPEALMETA_DATA_DETAIL({ state, commit, rootState }, params) {
        // commit('UPDATE_LOADING_STATUS', true)
        return new Promise((resolve, reject) => {
            rootState.http.post('GET_ONLINE_APPEALMETA_DATA_DETAIL', params).then(function (res) {
                commit('UPDATE_LOADING_STATUS', false)
                if (res.code !== '200' && res.code !== '000') {
                    commit('SHOW_ERROR_TOAST', res)
                    return false
                }
                resolve(res.data)
            }).catch((error) => {
                reject(error)
                commit('UPDATE_LOADING_STATUS', false)
                commit('SHOW_ERROR_TOAST', error)
            })
        })
    },
    // 提交申诉
    SAVE_ONLINE_APPEAL_DATA({ state, commit, rootState }, params) {
        commit('UPDATE_LOADING_STATUS', true)
        const faqAppealInfoList = JSON.parse(params.faqAppealInfoList)
        faqAppealInfoList.map((item) => {
            delete params[item.elementTmplId]
        })
        return new Promise((resolve, reject) => {
            rootState.http.post('SAVE_ONLINE_APPEAL_DATA', params).then((res) => {
                commit('UPDATE_LOADING_STATUS', false)
                if (res.code !== '200' && res.code !== '000') {
                    commit('SHOW_ERROR_TOAST', res)
                    return false
                }
                resolve(res.data)
            }).catch((error) => {
                reject(error)
                commit('UPDATE_LOADING_STATUS', false)
                commit('SHOW_ERROR_TOAST', error)
            })
        })
    }
    // 上传图片
    // UPLOADPIC({ state, commit, rootState }, params) {
    //     // commit('UPDATE_LOADING_STATUS', true)
    //     return new Promise(function (resolve, reject) {
    //         rootState.http.post('UPLOADPIC', params.param, params.config).then(function (res) {
    //             if (res.code !== '200' && res.code !== '000') {
    //                 commit('SHOW_ERROR_TOAST', res)
    //                 commit('UPDATE_LOADING_STATUS', false)
    //                 return false
    //             }
    //             resolve(res.data)
    //             commit('UPDATE_LOADING_STATUS', false)
    //         }).catch((error) => {
    //             reject(error)
    //             commit('UPDATE_LOADING_STATUS', false)
    //             commit('SHOW_ERROR_TOAST', error)
    //         })
    //     })
    // }
}
export default {
    state,
    mutations,
    actions
}