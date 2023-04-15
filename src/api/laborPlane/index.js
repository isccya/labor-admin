import request from '@/utils/request'

//查询劳动计划列表
export function getLaborListWithPage (query) {
  // console.log("query1",query);
  return request({
    url: '/admins/labor/laborPlan/page',
    method: 'get',
    params: query,
  })
}

//查询计划详细
export function getLaborDetail (query) {
  return request({
    url: `/admins/labor/laborPlan/${query}`,
    method: 'get',
  })
}

// 提交计划修改
export function schoolChangeLaborPlane (query) {
  return request({
    url: '/admins/labor/laborPlan',
    method: 'put',
    data: query,
  })
}
