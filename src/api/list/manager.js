import request from '@/utils/request'

//获取管理员信息
export function getManager() {
    return request({
        url: 'http://127.0.0.1:4523/m1/2398039-0-default/labor/test/user',
        method: 'get'
    });
}
//获取学院名字
export function getCollege() {
    return request({
        url: 'http://127.0.0.1:4523/m1/2398039-0-default/labor/test/user',
        method: 'get'
    })
}