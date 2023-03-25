import request from '@/utils/request'

//获取学生数据
export function getStudent(){
    return request({
        url: 'http://127.0.0.1:4523/m1/2398039-0-default/labor/test/user',
        method: 'get'
    });
}
