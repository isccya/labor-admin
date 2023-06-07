import request from '@/utils/request'


export function getNotice (query) {
    return request({
        url: '/labor/notice/list',
        method: 'get',
        params: query
    })
}

// 新增劳动通知
export function AddNotice (query) {
    return request({
        url: '/admins/labor/notice',
        method: 'post',
        data: query
    })
}