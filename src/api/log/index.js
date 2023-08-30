import request from '@/utils/request'

// 获取日志列表
export function getLogList(params){
    return request({
        url:'/admin/log/list',
        method:'GET',
        params,
    })
}