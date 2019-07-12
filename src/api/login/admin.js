import { axiosHttp } from '@/util/ajax'

export default {
    AdminLogin(option, headers = {}) {  // 管理员登录
        return axiosHttp('/api/AdminLogin/AdminLogin', 'post', option, headers);
    },
}