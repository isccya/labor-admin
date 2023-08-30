import request from '@/utils/request'

// 获取学期列表
export function getTermList(){
    return request({
        url:'/admin/term/list',
        method:'get',
    })
}

// 获取学院列表
export function getCollegeList(){
    return request({
        url:'/admin/college/list',
        method:'get',
    })
}

// 获取年级列表
export function getGradeList(){
    return request({
        url:'/admin/grade/list',
        method:'get',
    })
}

// 获取班级列表
export function getClassList(params){
    return request({
        url:'/admin/class/list',
        method:'get',
        params,
    })
}