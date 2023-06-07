import request from '@/utils/request'

//获取学生数据
export function getStudent (query) {
    return request({
        method: 'get',
        url: '/admins/labor/score/list',
        params: query
    })
}
