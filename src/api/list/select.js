import request from '@/utils/request'

// 查询学院列表
export function getDeptSelect() {
    return request({
        url: '/dept/util/listCollege',
        method: 'get'
    });
}

export function getClassSelect() {
    return request({
        url: '/labor/test / class',
        method: 'get'
    });
}

// 查询学期列表
export function getTermList (query) {
    return request({
        url: '/term/util/list',
        method: 'get',
        params: query
    })
}

