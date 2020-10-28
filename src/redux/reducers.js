// 引入redux的函数方法 暴露出去这样的函数的名字
import { combineReducers } from "redux";
// 设置函数 当传入参数时满足时应该执行的代码
function xxx(preState = {}, action) {
  switch (action.type) {
    default:
      return preState;
  }
}
export default combineReducers({ xxx });
