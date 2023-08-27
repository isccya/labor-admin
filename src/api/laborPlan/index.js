import request from '@/utils/request'

// 查询劳动计划列表
export function getLaborPlanList(params){
    return request({
        url:"/admin/plan/list",
        method:"get",
        params,
    })
} 

// 添加劳动计划
export function addLaborPlan(data){
    return request({
        url:"/admin/plan/add",
        method:"post",
        data,
    })
} 

// 删除劳动计划
export function deleteLaborPlan(id){
    return request({
        url:"/admin/plan/delete",
        method:"delete",
        params:{
            id,
        }
    })
} 

// 修改劳动计划
export function putLaborPlan(data){
    return request({
        url:"/admin/plan/update",
        method:"put",
        data,
    })
} 