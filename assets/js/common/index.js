import Vue from "vue";
import _ from "lodash";

var baseUrl = process.env.baseUrl;
var apiUrl = process.env.apiUrl;
// console.log("baseUrl:",baseUrl);
// console.log("apiUrl:",apiUrl);

const config = {
    ctx: baseUrl,
    res: apiUrl,
    api: apiUrl + "/api",
    timeout: 10000,
    title: "-刘氏一族",
    hostTag: "$RESOURCE"
}

Vue.prototype.ctx = config.ctx;
Vue.prototype.res = config.res;
Vue.prototype.api = config.api;
Vue.prototype.title = config.title;
Vue.prototype.hostTag = config.hostTag;
Vue.prototype._ = _;

export default config;
