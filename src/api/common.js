// 引入request 请求拦截器
import request from "@utils/request";

// 当前公共请求地址前缀
const url_prefix = "/common";

// 暴露 命名的请求到验证码的接口
export const reqVerifyCode = (randStr, ticket) => {
  return request({
    // 请求的方式
    method: "POST",
    //请求的地址
    url: `${url_prefix}/verifycode`,
    // 请求的参数
    data: {
      randStr,
      ticket,
    },
  });
};
