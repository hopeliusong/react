// 引入request 请求拦截器
import request from "@utils/request";

// 设置默认的地址
const url_prefix = "/regist";

// 设置 暴露 命名 请求电话号码的接口函数
export const reqVerifyPhone = (phone) => {
  return request({
    // 请求的方式
    method: "POST",
    // 请求地址
    url: `${url_prefix}/verify_phone`,
    // 参数 手机号码
    data: {
      phone,
    },
  });
};
