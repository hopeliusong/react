// 引入注册组件
import VerifyPhone from "@pages/regist/VerifyPhone";
// 创建所有路由组件的数组
const routes = [
  {
    // 路径
    path: "/regist/verifyPhone",
    // 组件
    component: VerifyPhone,
    // 是否严格匹配
    exact: true,
  },
];
// 暴露路由
export default routes;
