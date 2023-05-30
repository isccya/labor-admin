import request from '@/utils/request'


export function getDeptSelect() {
    return request({
        url: '/labor/test/dept',
        method: 'get'
    });
}

export function getClassSelect() {
    return request({
        url: '/labor/test / class',
        method: 'get'
    });
}