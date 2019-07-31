import { role } from '../URL'
import { Success, Msg } from '../config'
import { pdSbList, GetXmxq, List } from './data'

export default [
    // 获取角色列表
    {
        method() {
            return List
        },
        url: `${role}List`,
        type: 'get',
    },
    // 新增
    {
        url: `${role}Add`,
        type: 'post',
        method(data) {
            console.log('Add: ', data);
            return {
                Success,
                Msg,
            }
        }
    },
    // 编辑
    {
        url: `${role}Update`,
        type: 'post',
        method(data) {
            console.log('Update: ', data);
            return {
                Success,
                Msg,
            }
        }
    },
    // 删除
    {
        url: `${role}Delete`,
        type: 'get',
        method(data) {
            console.log('Delete: ', data);
            return {
                Success,
                Msg,
            }
        }
    },
    // 获取行数据
    {
        url: `${role}GetPdSbList`,
        type: 'get',
        method(data) {
            console.log('GetPdSbList: ', data);
            return {
                code,
                message,
                data: pdSbList,
            }
        }
    }
]