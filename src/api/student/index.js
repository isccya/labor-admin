import request from '@/utils/request'

// 获取学生信息列表
export function getStudentList(params){
    return request({
        url:'/admin/student/list',
        method:'GET',
        params,
    })
}