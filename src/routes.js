module.exports = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    name: 'home',
    component: resolve => require(['./pages/home'], resolve),
    meta: {
        level: 0,
        title: '个人中心'
    }
}, {
    path: '/service',
    name: 'service',
    component: resolve => require(['./pages/service'], resolve),
    meta: {
        level: 0,
        title: '联系客服',
        rightLink: 'service/complain',
        headerRightTitle: '我的申诉'
    }
}, {
    path: '/nickname',
    name: 'nickname',
    component: resolve => require(['./pages/nickname'], resolve),
    meta: {
        parentTitle: '个人中心',
        title: '修改昵称',
        showBack: true
    }
}, {
    path: '/test',
    name: 'test',
    component: resolve => require(['./pages/test'], resolve),
    meta: {
        parentTitle: '个人中心',
        title: '测试CSS',
        showBack: true
    }
}, {
    path: '/tool',
    name: 'tool',
    component: resolve => require(['./pages/tool'], resolve),
    meta: {
        level: 0,
        title: '更多'
    }
}, {
    path: '/tool/systemMessages',
    name: 'system-messages',
    component: resolve => require(['./pages/systemMessages'], resolve),
    meta: {
        parentTitle: '更多',
        title: '系统消息',
        showBack: true
    }
}]
