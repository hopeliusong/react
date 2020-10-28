// 引入ajax请求封装的axios
import axios from "axios";

// 设置报错的信息
const messages = {
  401: "没有权限",
  403: "禁止访问",
  404: "找不到地址",
};
// 设置访问的路径默认原有地址
const request = axios.create({
  baseURL: "/",
});

// 请求拦截
request.interceptors.request.use((config) => {
  return config;
});

// 返回拦截
request.interceptors.response.use(
  (response) => {
    if (response.data.code === 20000) {
      return response.data.data;
    } else {
      return Promise.reject(response.data.message);
    }
  },
  (error) => {
    let message = "未知错误，请联系管理员";
    if (error.response) {
      if (messages[error.response.status]) {
        message = messages[error.response.status];
      }
    } else {
      if (error.message.indexOf("NetWork Err")) {
        message = "暂无网络,请打开网络或链接WIFI";
      } else if (error.message.indexOf("timeout")) {
        message = "网络延迟";
      }
    }
    //返回错误的地方
    return Promise.reject(message);
  }
);
export default request;
