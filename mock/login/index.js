import { Random, Success, Msg } from '../config'

const permissionList = ['WarehouseManage', 'User', 'GoodsManage', 'RoleManage'];    // 默认需要权限的菜单

export default [
    // 登录
    {
        method() { 
            const Id = Random.natural();
            const Modular = permissionList;

            return {
                Id,
                Modular,
                Success,
                Msg
            }
        },
        url: '/api/User/Login',
        type: 'post',
    },
    // 管理员登录
    {
        method() { 
            const Id = Random.natural();
            const Modular = permissionList;

            return {
                Id,
                Modular,
                Success,
                Msg
            }
        },
        url: '/api/AdminLogin/AdminLogin',
        type: 'post',
    },
    // 管理员验证码
    {
        method() {
            return Random.image('200x100', '#4A7BF7', 'Hello');
        },
        url: '/api/CaptCha/AdminLogin',
        type: 'get',
    },
    // 用户验证码
    {
        method() {
            return Random.image('200x100', '#4A7BF7', 'Hello');
        },
        url: '/api/CaptCha/UserLogin',
        type: 'get',
    },
]