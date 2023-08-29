import request from '@/utils/request'

// 获取劳动公告列表
export function getLaborNoticeList(params){
    return request({
        url:'/admin/notice/list',
        method:'GET',
        params,
    })
}

// 新增劳动公告
export function addLaborNotice(data){
    return request({
        url:"/admin/notice/add",
        method:'POST',
        data,
    })
}

// 删除劳动公告
export function deleteLaborNotice(noticeId){
    return request({
        url:"/admin/notice/delete",
        method:'DELETE',
        params:{
            noticeId,
        }
    })
}

// 修改劳动公告
export function updateLaborNotice(data){
    return request({
        url:"/admin/notice/update",
        method:'PUT',
        data,
    })
}