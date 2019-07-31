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