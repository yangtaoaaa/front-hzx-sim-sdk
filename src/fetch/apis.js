import {init, httpCancel} from './initFetch.js'

export default (baseUrl, router) => {
    const instance = init(baseUrl, router)
    const createAPI = (url, method, data, $this, cancel, other) => {
        let config = {
            method: method,
            url: url,
            data,
            ...other
        }
        httpCancel(config, $this, cancel)
        return instance(config)
    }
    let api = {
        // ajax开头
        // 礼包
        // 礼包列表
        listGameGiftbag: (data, $this, cancel) => createAPI(`/web/giftbag/listGameGiftbag${window.suffix}`, 'post', data, $this, cancel),
        // 礼包明细
        getGiftbagDetail: (data, $this, cancel) => createAPI(`/web/giftbag/getGiftbagDetail${window.suffix}`, 'post', data, $this, cancel),
        // 礼包淘号
        getTaoCode: (data, $this, cancel) => createAPI(`/web/giftbag/getTaoCode${window.suffix}`, 'post', data, $this, cancel),
        // 领取礼包
        gainCode: (data, $this, cancel) => createAPI(`/web/giftbag/gainCode${window.suffix}`, 'post', data, $this, cancel),
        // 我的礼包
        listMyGiftbag: (data, $this, cancel) => createAPI(`/web/giftbag/listMyGiftbag${window.suffix}`, 'post', data, $this, cancel),
        // 客服
        // 查询是否有我的申诉是未读的
        getReadStatus: (data, $this, cancel) => createAPI(`/web/faq/getReadStatus${window.suffix}`, 'post', data, $this, cancel),
        // 修改申诉读取状态
        updateReadStatus: (data, $this, cancel) => createAPI(`/web/faq/updateReadStatus${window.suffix}`, 'post', data, $this, cancel),
        // 查询分类, 在线申诉
        listCategory: (data, $this, cancel) => createAPI(`/web/faq/listCategory${window.suffix}`, 'post', data, $this, cancel),
        // 常见问题
        listFaqDetail: (data, $this, cancel) => createAPI(`/web/faq/listFaqDetail${window.suffix}`, 'post', data, $this, cancel),
        // 常见问题--V312接口修改
        listHotFaq: (data, $this, cancel) => createAPI(`/web/faq/listHotFaq${window.suffix}`, 'post', data, $this, cancel),
        // 查询申诉
        listAppeal: (data, $this, cancel) => createAPI(`/web/faq/listAppeal${window.suffix}`, 'post', data, $this, cancel),
        // 查询问题
        queryFaq: (data, $this, cancel) => createAPI(`/web/faq/queryFaq${window.suffix}`, 'post', data, $this, cancel),
        // 常见问题详情
        getFaq: (data, $this, cancel) => createAPI(`web/faq/getFaqDetail${window.suffix}`, 'post', data, $this, cancel),
        // 上传点击数
        addFaqHitAmount: (data, $this, cancel) => createAPI(`/web/faq/addFaqHitAmount${window.suffix}`, 'post', data, $this, cancel),
        // 申诉结果
        getAppeal: (data, $this, cancel) => createAPI(`/web/faq/getAppeal${window.suffix}`, 'post', data, $this, cancel),
        // 申诉结果（新接口）
        listAppealInfo: (data, $this, cancel) => createAPI(`/web/faq/listAppealInfo${window.suffix}`, 'post', data, $this, cancel),
        // 申诉详情
        getCategoryDetail: (data, $this, cancel) => createAPI(`/web/faq/getCategoryDetail${window.suffix}`, 'post', data, $this, cancel),
        // 上传图片
        uploadImg: (data, config) => instance.post(`/web/upload/uploadImg${window.suffix}`, data, config),
        // 保存
        saveAppealData: (data, $this, cancel) => createAPI(`/web/faq/saveAppealData${window.suffix}`, 'post', data, $this, cancel),

        // 系统消息
        // 系统消息
        listGameMessage: (data, $this, cancel) => createAPI(`/web/gameMessage/listGameMessage${window.suffix}`, 'post', data, $this, cancel),
        // 系统消息详情
        getGameMsgBase: (data, $this, cancel) => createAPI(`/web/gameMessage/getGameMsgBase${window.suffix}`, 'post', data, $this, cancel),
        // 系统消息详情
        getGameMsgUseByGameId: (data, $this, cancel) => createAPI(`/web/gameMessage/getGameMsgUseByGameId${window.suffix}`, 'post', data, $this, cancel),

        // 用户信息
        // 获取实名认证
        getUserInfo: (data, $this, cancel) => createAPI(`/web/user/getUserInfo${window.suffix}`, 'post', data, $this, cancel),
        // 修改用户姓名
        editUserInfo: (data, $this, cancel) => createAPI(`/web/user/editUserInfo${window.suffix}`, 'post', data, $this, cancel),
        // 获取实名认证
        getUserIdentity: (data, $this, cancel) => createAPI(`/web/user/getUserIdentity${window.suffix}`, 'post', data, $this, cancel),
        // 设置实名认证
        setupIdentity: (data, $this, cancel) => createAPI(`/web/user/setupIdentity${window.suffix}`, 'post', data, $this, cancel),

        // 修改用户姓名
        isNeedOrigPwd: (data, $this, cancel) => createAPI(`/web/user/isNeedOrigPwd${window.suffix}`, 'post', data, $this, cancel),
        // 设置密码
        setupPwd: (data, $this, cancel) => createAPI(`/web/user/setupPwd${window.suffix}`, 'post', data, $this, cancel),
        // 修改用户姓名
        changePassword: (data, $this, cancel) => createAPI(`/web/user/changePassword${window.suffix}`, 'post', data, $this, cancel),
        // 发送验证码
        sendVcode: (data, $this, cancel) => createAPI(`/web/user/sendVcode${window.suffix}`, 'post', data, $this, cancel),
        // 绑定手机号
        bindMobile: (data, $this, cancel) => createAPI(`/web/user/bindMobile${window.suffix}`, 'post', data, $this, cancel),
        // 绑定手机号
        unbindMobile: (data, $this, cancel) => createAPI(`/web/user/unbindMobile${window.suffix}`, 'post', data, $this, cancel),

        // 交易信息
        // 浮窗首页获取用户展示信息
        getAcctInfo: (data, $this, cancel) => createAPI(`/web/trade/getAcctInfo${window.suffix}`, 'post', data, $this, cancel),
        // 查询所有代金券
        // queryAllCoupons: (data, $this, cancel) => createAPI(`/web/trade/queryAllCoupons${window.suffix}`, 'post', data, $this, cancel),
        // 查询所有代金券
        listCoupon: (data, $this, cancel) => createAPI(`/web/trade/listCoupon${window.suffix}`, 'post', data, $this, cancel),
        // 查询交易记录
        listOrder: (data, $this, cancel) => createAPI(`/web/trade/listOrder${window.suffix}`, 'post', data, $this, cancel),
        // 获取充值标签
        listCatptPriceTag: (data, $this, cancel) => createAPI(`/web/trade/listCatptPriceTag${window.suffix}`, 'post', data, $this, cancel),

        // 游戏
        // 自动获取游戏名称
        getCurrentGameName: (data, $this, cancel) => createAPI(`/web/game/getCurrentGameName${window.suffix}`, 'post', data, $this, cancel)
    }
    return api
}
