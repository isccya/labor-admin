import request from '@/utils/request'

// 查询学期列表
export function getTermListOption () {
  return request({
    url: '/term/util/list',
    method: 'get',
  })
}

//查询dept列表
export function getDeptOption () {
  return request({
    url: '/labor/test/dept',
    method: 'get',
    headers: {
      isToken: false,
    },
  })
}
