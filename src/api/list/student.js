import request from '@/utils/request'

//获取学生数据
export function getStudent(){
    return request({
        url: '/labor/demo/list',
        method: 'get'
    });
}
