// 引入 React 和Component
import React, { Component } from "react";
//引入 验证码组件
import VerifyButton from "@comps/VerifyButton";
//引入所有需要组件的库
import { NavBar, Icon, InputItem, WingBlank, Modal, Toast } from "antd-mobile";
// 引入rcform用于表单获取值表单验证
import { createForm } from "rc-form";
// 引入获取电话号码验证的接口函数
import { reqVerifyPhone } from "@api/regist";

// 引入样式文件
import "./index.css";


// 创建组件
class VerifyPhone extends Component {
  state = {
    // 设置按钮的显示状态
    isDisabled: true,
  };

  // 设置对话框
  componentDidMount() {
    Modal.alert(
      "注册协议及隐私政策",
      <span className="policy-text">
        在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
        <strong className="policy-strong-text">
          请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）
        </strong>
        ：<span className="policy-content">《硅谷用户注册协议》</span>
        <span className="policy-content">《硅谷隐私政策》</span>
      </span>,
      [
        {
          text: "不同意",
          onPress: () => console.log("cancel"),
        },
        {
          text: "同意",
          style: { backgroundColor: "red", color: "#fff" },
        },
      ]
    );
  }

  // 当用户输入数据时就会触发
  validator = (rule, value, callback) => {
    // console.log(rule, value);

    // 设置正则表达式
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|199)[0-9]{8}$/;

    // 先默认显示状态为不显示
    let isDisabled = true;

    // 当输入的值满足正则表达式时 改变状态
    if (reg.test(value)) {
      isDisabled = false;
    }

    // 更新界面和状态
    this.setState({
      isDisabled,
    });

    // callback必须调用，否则检验失败
    // callback(message) 校验失败
    // callback() 校验成功
    callback();
  };

  verifyPhone = async () => {
    try {
      // 获取单个表单项的值
      const phone = this.props.form.getFieldValue("phone");
      // 获取所有表单项的值
      // const value2 = this.props.form.getFieldsValue();
      const result = await reqVerifyPhone(phone);
      console.log(result);

      // 请求成功 - 手机号不存在
      // 提示弹框 - 确认请求短信验证码
    } catch (e) {
      // 请求失败 - 手机号存在
      Toast.fail(e, 3);
    }
  };

  render() {
    // 解构状态
    const { isDisabled } = this.state;
    // 拿到form中获取值和表单验证的方法
    const { getFieldProps } = this.props.form;

    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon className="left" type="left" />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          硅谷注册
        </NavBar>
        <WingBlank>
          <div className="verify-phone-input">
            <InputItem
              {...getFieldProps("phone", {
                // 表单校验规则
                rules: [{ validator: this.validator }],
              })}
              clear
              placeholder="请输入手机号"
            >
              <div className="verify-phone-prefix">
                <span>+86</span>
                <Icon type="down" />
              </div>
            </InputItem>
          </div>
          <VerifyButton
            disabled={isDisabled}
            callback={this.validator}
            btnText="下一步"
          />
        </WingBlank>
      </div>
    );
  }
}

// createForm是高阶组件：给VerifyPhone传递操作表单form对象
export default createForm()(VerifyPhone);
