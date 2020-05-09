import axios from 'axios'

const Utils = {
    imgPath: 'http://127.0.0.1:8011/img/',
    apiPath: 'http://127.0.0.1:8010/'
}

Utils.ajax = axios.create({
    baseURL: Utils.apiPath,
    timeout: 50000
})

Utils.ajax.interceptors.response.use(res => {
    return res.data;
});

//获取今天的时间戳
Utils.getTodayTime = function() {
    const date = new Date()
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime()
}

//获取前一天的数据
Utils.prevDay = function(setStemp = (new Date()).getTime()) {
    const date = new Date(setStemp)
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    date;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return year + '' + month + '' + day
}

export default Utils