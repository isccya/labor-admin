import request from '@/utils/request'


export function getNotice (query) {
    return request({
        url: '/labor/notice/list',
        method: 'get',
        params: query
    })
}

// 新增劳动通知
export function addNotice (query) {
    return request({
        url: '/admins/labor/notice',
        method: 'post',
        data: query
    })
}

// 删除劳动通知
export function deleteNotice (query) {
    return request({
        url: `/admins/labor/notice/${query.ids}`,
        method: 'delete',
    })
}

// 获取劳动通知详细
export function detailNotice (query) {
    return request({
        url: `/labor/notice/${query.id}`,
        method: 'get',
    })
}