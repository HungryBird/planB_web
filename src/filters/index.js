import { XM } from '@/enumeration'

export const f_cd = (value) => {
    const obj = {
        'home': '主页',
        'WarehouseManage': '仓库管理',
        'User': '用户管理',
        'GoodsManage': '商品管理',
        'RoleManage': '角色管理',
    }
    return obj[value]
}

export const f_fjzt = (value) => {
    return XM.FJZT_A.map((item) => {
        if (item.value == value) {
            return item.label
        }
    })[0];
}

export default {
    f_cd,
    f_fjzt,
}