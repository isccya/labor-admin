import request from '@/utils/request'

self.onmessage = function (event) {
    // 获取来自主线程的数据
    const { collegeId, grade, classId, token } = event.data;
    request({
        url: '/admin/score/excel',
        method: 'GET',
        responseType: 'blob',
        headers: {
            Authorization: token,
        },
        params: {
            collegeId,
            grade,
            classId
        },
    }).then((res) => {
        const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })
        self.postMessage(blob)
    }).catch(error => {
        self.postMessage({ type: 'error', data: '导出失败：' + error.message });
    })
}