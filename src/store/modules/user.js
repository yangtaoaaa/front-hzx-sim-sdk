const state = {
    userInfo: {},
    needOrigPwd: null,
    acctInfo: {},
    isAfter311Build: false
}
const getters = {
    getUserName(state) {
        return state.userInfo.userName
    }
}
const mutations = {
    setNeedOrigPwd(state, needOrigPwd) {
        state.needOrigPwd = needOrigPwd
    },
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },
    setAcctInfo(state, acctInfo) {
        state.acctInfo = acctInfo
    }
}

const actions = {
    async getUserInfo({rootState, state, commit}, isRefresh) {
        if (!isRefresh && Object.keys(state.userInfo).length > 0) {
            return state.userInfo
        }
        const loading = rootState.$loading()
        let res
        try {
            res = await rootState.$apis.getUserInfo()
        } catch (error) {
            console.error(error)
        }
        loading.close()
        if (res.code === '000') {
            commit('setUserInfo', res.data)
            return res.data
        } else {
            rootState.$sdkToast({
                message: res.message
            })
            return res
        }
    },
    async getAcctInfo({rootState, commit}, isRefresh) {
        if (!isRefresh && Object.keys(state.acctInfo).length > 0) {
            return state.acctInfo
        }
        const res = await rootState.$apis.getAcctInfo()
        if (res.code === '000') {
            commit('setAcctInfo', res.data)
        } else {
            rootState.$sdkToast({
                message: res.message
            })
        }
    },
    async isNeedOrigPwd({rootState, commit, state}) {
        if (state.needOrigPwd === null) {
            const loading = rootState.$loading()
            const res = await rootState.$apis.getAcctInfo()
            loading.close()
            if (res.code === '000') {
                commit('setNeedOrigPwd', res.data)
            } else {
                rootState.$sdkToast({
                    message: res.message
                })
            }
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}