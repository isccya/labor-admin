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

//获取个人成绩和信息
export function getPersonalAuditList (query) {
  return request({
    url: `/admins/labor/score/${query}`,
    method: 'get',
  })
}

//导出审核列表
export function getExportAuditList (query, config) {
  return request({
    url: `/admins/labor/score/export`,
    method: 'get',
    params: query,
    ...config,
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

//劳动记录列表
export function getLaborRecordList (query) {
  return request({
    url: `/admins/labor/record/${query}`,
    method: 'get',
  })
}

//劳动记录列表
export function getLaborRecordList2 (query) {
  return request({
    url: `/admins/labor/record`,
    method: 'get',
    params: query,
  })
}

// 劳动记录详细
export function getLaborRecordDetail (query) {
  return request({
    url: `/admins/labor/record/get/${query}`,
    method: 'get',
  })
}
