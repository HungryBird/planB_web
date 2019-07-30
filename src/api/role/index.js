import { axiosHttp } from '@/util/ajax'

export default {
    roleList(option, headers = {}) {
        return axiosHttp('/api/RoleManage/List', 'get', option, headers);
    },
    roleAdd(option, headers = {}) {
        return axiosHttp('/api/RoleManage/Add', 'post', option, headers);
    },
    roleUpdate(option, headers = {}) {
        return axiosHttp('/api/RoleManage/Update', 'post', option, headers);
    },
    roleDelete(option, headers = {}) {
        return axiosHttp('/api/RoleManage/Delete', 'get', option, headers);
    },
}