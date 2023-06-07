import request from '@/utils/request'

//获取管理员信息
export function getManager (query) {
    return request({
        url: '/system/role/adminRoleUsers',
        method: 'get',
        params: query
    })
}
