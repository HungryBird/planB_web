import { getToken, getSession } from '@/util/util'

const state = {
    token: getToken(),
    user: getSession('user'),   // 存入用户信息
    Id: '', // 不存入缓存的Id，刷新之后消失
    router: getSession('router'),   // 路由的参数
    activeIndex: getSession('activeIndex') || 'dash',    // 当前打开页面
}

export default state;