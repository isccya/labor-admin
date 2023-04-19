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

//获取个人审核列表
export function getPersonalAuditList (query) {
  return request({
    url: `/admins/labor/score/${query}`,
    method: 'get',
  })
}

//导出审核列表
export function getExportAuditList (query) {
  return request({
    url: `/admins/labor/score/export`,
    method: 'get',
    params: query,
  })
}

//一键评分
export function makeOneKeyGrade (query) {
  return request({
    url: `/admins/labor/score/${query.ids}/${query.score}`,
    method: 'put',
  })
}

//评分
export function makePersonalGrade (query) {
  return request({
    url: `/admins/labor/score`,
    method: 'put',
    data: query,
  })
}
