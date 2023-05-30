import request from '@/utils/request'

//获取学生数据
export function getStudent(){
    return request({
        method: 'get',
        url: 'http://49.123.0.28:7076/labor/test/user',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImNjNDVhNmM2LWMxZmEtNDk0MS05Y2YzLWRjYzcxYzhkNWE3NCJ9.DZuJpZMIdFMzBJ2GkMb1Q2H7gLs2KQwRuzDqvPGRPdKNmJMa8XDqJwIyrH66dlWR1bfSXhc26Bcgx90QYCdvoA',
            'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
        }
    });
}
