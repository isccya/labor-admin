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
export function getLaborDetail(){
    return request({
        url:'/admin/record/detatil',
        method:"GET",
    })
}

// 导出劳动成绩excel表格
export function exportLaborScore(){
    return request({
        url:'/admin/score/excel',
        method:'GET',
    })
}

// 评分
export function judgeScore(data){
    return request({
        url:'/admin/score',
        method:'POST',
        data,
    })
}