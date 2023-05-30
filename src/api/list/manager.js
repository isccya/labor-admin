import request from '@/utils/request'

//获取管理员信息
export function getManager() {
    return request({
        url: '/system/role/adminRoleUsers',
        method: 'get'
    });
}
//获取学院名字
export function getCollege() {
    return request({
        url: '/labor/test/dept',
        method: 'get'
    })
}