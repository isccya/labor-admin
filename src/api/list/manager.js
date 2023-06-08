import request from '@/utils/request'

//获取管理员信息
export function getManager (query) {
    return request({
        url: '/system/role/adminRoleUsers',
        method: 'get',
        params: query
    })
}
//删除管理员
export function deleteManager (query) {
    return request({
        url: '/system/role/adminRoleUsers',
        method: 'delete',
        data: query
    })
}
//修改管理员信息
export function updateManager (query) {
    return request({
        url: '/system/role/adminRoleUsers',
        method: 'post',
        data: query
    })
}