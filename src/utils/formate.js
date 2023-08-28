/**
 * 时间格式化
 * */ 

export function timeFormate(val){
    const date = new Date(val)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}年${month}月${day}日`
}