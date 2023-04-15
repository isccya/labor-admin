import request from '@/utils/request'

//查询审核列表
export function getAuditList (query) {
  // console.log("query",query);
  return request({
    url: '/admins/labor/score/list',
    method: 'get',
    params: query,
  })
}

export function getPersonalAuditList (query) {
  return request({
    url: `/admins/labor/score/${query}`,
    method: 'get',
  })
}

export function getExportAuditList (query) {
  return request({
    url: `/admins/labor/score/export`,
    method: 'get',
    params: query,
  })
}

export function makeOneKeyGrade (query) {
  return request({
    url: `/admins/labor/score/${query.ids}/${query.score}`,
    method: 'put',
  })
}
