import Mock from 'mockjs'
import { Success, Msg, Total } from '../config'
const Random = Mock.Random;

export const List = Mock.mock({
    Total,
    Success,
    Msg,
    "List|10": [
        {
            
            "Id": Random.guid(),
            "RoleName": Random.cname(),
            "IsAdmin": Random.boolean() ? 1 : 0,
        }
    ]
})

export const GetXmxq = {
    "xmid": "554",
    "xmmc": "隆安盘点任务",
    "yymc": "第一人民医院",
    "xmzt": 1,
    "gzdd": "隆安",
    "gzkssj": "2019-06-13 16:30:04",
    "gzjssj": "2019-06-28 16:29:26",
    "gzsj": "2019-06-13 至 2019-06-28",
    "jflxr": "波",
    "jflxrdh": "13557301445",
    "cjsj": "2019-06-13 16:29:42",
    "pdryid": "123",
    "pdryxm": "陈天波",
    "xmsm": "盘点"
}

export const GetXmList = {
    "xmlb": [
        {
            "xmid": "554",
            "xmmc": "隆安盘点任务",
            "yymc": "第一人民医院",
            "xmzt": 1,
            "gzdd": "隆安",
            "gzkssj": "2019-06-13 16:30:04",
            "gzjssj": "2019-06-28 16:29:26",
            "gzsj": "2019-06-13 至 2019-06-28",
            "jflxr": "波",
            "jflxrdh": "13557301445",
            "cjsj": "2019-06-13 16:29:42",
            "pdryid": "123",
            "pdryxm": "陈天波",
            "xmsm": "盘点"
        },
        {
            "xmid": "554",
            "xmmc": "隆安盘点任务",
            "yymc": "第一人民医院",
            "xmzt": 0,
            "gzdd": "隆安",
            "gzkssj": "2019-06-13 16:30:04",
            "gzjssj": "2019-06-28 16:29:26",
            "gzsj": "2019-06-13 至 2019-06-28",
            "jflxr": "波",
            "jflxrdh": "13557301445",
            "cjsj": "2019-06-13 16:29:42",
            "pdryid": "123",
            "pdryxm": "陈天波",
            "xmsm": "盘点"
        },
    ],
    "total": 2,
}