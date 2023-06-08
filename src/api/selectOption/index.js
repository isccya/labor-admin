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
    url: '/dept/util/listCollege',
    method: 'get',
  })
}

//查询班级列表
export function getClassOption (query) {
  return request({
    url: '/dept/util/class',
    method: 'get',
    params: query,
  })
}
