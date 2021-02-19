export function formatterPersonNum(num: number) {
    let newNum: number | string = ''
    if (num > 100000000) {
        newNum = (num / 100000000).toFixed(1) + '亿'
    } else if (num > 1000000) {
        newNum = (num / 1000000).toFixed(1) + '百万'
    } else if (num > 10000) {
        newNum = (num / 10000).toFixed(1) + '万'
    } else {
        newNum = num
    }
    return newNum
}