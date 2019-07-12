import { axiosHttp } from '@/util/ajax'

export default {
    Register(option, headers = {}) {    // 注册
        return axiosHttp('/api/User/Register', 'post', option, headers);
    },
    Delete(option, headers = {}) {  // 删除
        return axiosHttp('/api/User/Delete', 'post', option, headers);
    },
    List(option, headers = {}) {    // 获取用户列表
        return axiosHttp('/api/User/List', 'post', option, headers);
    },
    Update(option, headers = {}) {  // 用户编辑
        return axiosHttp('/api/User/Update', 'post', option, headers);
    },
    Login(option, headers = {}) {   // 用户登录
        return axiosHttp('/api/User/Login', 'post', option, headers);
    },
}