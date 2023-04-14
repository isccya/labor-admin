import request from '@/utils/myRequest'

//查询审核列表
export function getAuditList (query) {
  return request({
    url: '/admins/labor/score/list',
    method: 'get',
    params: query,
  })
}

export function getPersonalAudioList (query) {
  return request({
    url: `/admins/labor/score/${query}`,
    method: 'get',
  })
}
