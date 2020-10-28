// 引入创建状态的函数以及中间键包裹异步的
import { createStore, applyMiddleware } from "redux";
// 引入异步请求 thunk
import thunk from "redux-thunk";
// 引入可使用插件查看react状态
import { composeWithDevTools } from "redux-devtools-extension";

// 引入reducers
import reducers from "./reducers";

// 包裹异步请求
let middleware = applyMiddleware(thunk);
// 判断是否在开发环境
if (process.env.NODE_ENV === "development") {
  // 如果在开发环境 等于
  middleware = composeWithDevTools(middleware);
}
// 暴露出异步需要的参数
export default createStore(reducers, middleware);
