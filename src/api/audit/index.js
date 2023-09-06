import request from '@/utils/request'

// 获取审核列表
export function getAuditList(params){
    return request({
        url:'/admin/score/list',
        method:'GET',
        params,
    })
}

// 获取劳动记录列表
export function getLaborRecordList(params){
    return request({
        url:'/admin/record/list',
        method:'GET',
        params,
    })
}

// 获取劳动详情
export function getLaborDetail(recordId){
    return request({
        url:'/admin/record/detail',
        method:"GET",
        params:{
            recordId,
        }
    })
}

// 导出劳动成绩excel表格
export function exportLaborScore(params){
    return request({
        url:'/admin/score/excel',
        method:'GET',
        responseType:'blob',
        params,
    })
}

// 评分(包括修改)
export function judgeScore(data){
    return request({
        url:'/admin/score',
        method:'POST',
        data,
    })
}
