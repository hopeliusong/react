//引入React 和 Component
import React, { Component } from "react";
// 引入ProTypes 设置接收到参数的类型
import PropTypes from "prop-types";
// 引入Button组件和Toast 轻微提示 组件
import { Button, Toast } from "antd-mobile";
// 引入api接口请求验证码的函数
import { reqVerifyCode } from "@api/common";

// web端接入文档：https://cloud.tencent.com/document/product/1110/36841#.E5.AE.9E.E4.BE.8B.E6.96.B9.E6.B3.95
// 设置验证码需要的参数 在按钮上
const verifyBtnProps = {
  id: "TencentCaptcha",
  "data-appid": "2030765311",
  "data-cbfn": "verifyCallback",
};

// 暴露 设置 组件验证码组件
export default class verifyButton extends Component {
  // 设置需要接收的参数的类型已经是否必要
  static propTypes = {
    // 按钮是否显示
    disabled: PropTypes.bool.isRequired,
    // 回调函数
    callback: PropTypes.func.isRequired,
    // 按钮的文本
    btnText: PropTypes.string.isRequired,
  };

  // 执行一次的生命周期函数
  componentDidMount() {
    // window的函数 验证码请求
    window.verifyCallback = async (res) => {
      // console.log(res);
      if (res.ret === 0) {
        try {
          // 验证成功 客户端验证成功，还需要进行二次验证，服务端验证
          await reqVerifyCode(res.randstr, res.ticket);

          // 服务端验证通过 - 验证手机号
          await this.callback();
        } catch (e) {
          // 软提示 弹框 e错误 和提示的时间
          Toast.fail(e, 3);
        }
      }
    };
  }

  render() {
    // 解构获取到的参数 下面需要使用渲染上去
    const { disabled, btnText } = this.props;
    return (
      <>
        <Button
          style={{ display: disabled ? "block" : "none" }}
          className="warning-btn"
          type="warning"
          disabled
        >
          {btnText}
        </Button>
        <Button
          style={{ display: !disabled ? "block" : "none" }}
          {...verifyBtnProps}
          className="warning-btn"
          type="warning"
        >
          {btnText}
        </Button>
      </>
    );
  }
}
