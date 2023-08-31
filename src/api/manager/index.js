import request from '@/utils/request'

// 获取管理员信息列表
export function getManagerList(params){
    return request({
        url:'/admin/list',
        method:'GET',
        params,
    })
}

// 搜索用户信息
export function getManagerInfo(params){
    return request({
        url:'/admin/search',
        method:'GET',
        params,
    })
}

// 新增管理员
export function addManagerList(data){
    return request({
        url:'/admin/register',
        method:'POST',
        data,
    })
}

// 修改管理员信息
export function updateManagerList(data){
    return request({
        url:'/admin/update',
        method:'PUT',
        data,
    })
}

// 删除管理员
export function deleteManager(userId){
    return request({
        url:'/admin/delete',
        method:'delete',
        params:{
            userId,
        }
    })
}
