import request from '@/utils/myRequest'

//查询劳动计划列表
export function getLaborListWithPage(query) {
  return request({
    url: '/admins/labor/laborPlan/page',
    method: 'get',
    params: query,
  })
}

export function getLaborDetail(query) {
  return request({
    url: `/admins/labor/laborPlan/${query}`,
    method: 'get',
  }) 
}
