import { Random, lerrcode } from '../config'
import { CheckApi } from '../URL'
import { } from '@/util/util'

const permissionList = ['WarehouseManage', 'User', 'GoodsManage', 'RoleManage'];    // 默认需要权限的菜单

export default [
    // 登录
    {
        method() { 
            const yhid = Random.natural();
            const yhsj = Random.natural(11);
            const yhxm = Random.cname();
            const cd = permissionList;
        
            // const expires = Random.integer(1, 9);
            const user = {
                yhid,
                yhsj,
                yhxm,
                cd,
                // expires,
            }
            return {
                errcode: lerrcode, 
                user,
                message: '登陆成功',
            }
        },
        url: `${CheckApi}Login`,
        type: 'post',
    },
]