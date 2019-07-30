import { axiosHttp } from '@/util/ajax'

export default {
    Login(option, headers = {}) {
        return axiosHttp('/api/User/Login', 'post', option, headers);
    },
    AdminLogin(option, headers = {}) {
        return axiosHttp('/api/AdminLogin/AdminLogin', 'post', option, headers);
    },
    captChaUser(option, headers = {}) {
        return axiosHttp('/api/CaptCha/UserLogin', 'get', option, headers);
    },
    captChaAdmin(option, headers = {}) {
        return axiosHttp('/api/CaptCha/AdminLogin', 'get', option, headers);
    },
    test(option, headers = {}) {
        return axiosHttp('/test', 'get', option, headers);
    }
}