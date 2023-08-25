import request from '@/utils/request'

// 查询劳动计划列表
export function getLaborList(){
    return request({
        url:"/admin/plan/list",
        method:"get",
    })
} 

// 添加劳动计划
export function addLaborList(data){
    return request({
        url:"/admin/plan/add",
        method:"post",
        data,
    })
} 

// 删除劳动计划
export function deleteLaborList(){
    return request({
        url:"/admin/plan/delete",
        method:"delete",
    })
} 

// 修改劳动计划
export function putLaborList(){
    return request({
        url:"/admin/plan/add",
        method:"put",
    })
} 