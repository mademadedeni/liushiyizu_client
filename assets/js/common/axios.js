import axios from "axios";
import config from "./index.js";
var source = axios.CancelToken.source();

const request = axios.create({
    baseURL: config.api,
    withCredentials: true,
    cancelToken: source.token,
});

// 添加请求拦截器
request.interceptors.request.use(function (_config) {
    // if (!localStorage.getItem(config.storageName) && _config.url != "/users/auth") {
    //     source.cancel('not login');
    //     localStorage.removeItem(config.storageName);
    //     window.location.href = config.web + "/login" + "?redirect=" + location.href;
    // }
    return _config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    //未登录
    // if (response.data.code == "05") {
    //     localStorage.removeItem(config.storageName);
    //     window.location.href = "/login" + "?redirect=" + location.href;
    // }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


var api = {
    get: function (url, data) {
        var params = {};
        if (data && !data.params) {
            params.params = data;
        } else {
            params = data;
        }
        return request.get(url, params)
    },
    post: request.post,
    put: request.put,
    patch: request.patch,
    delete: request.delete,
};

export {
    api
}
