import React from "react";
import ReactDOM from "react-dom";

import store from "./redux/store";
import App from "./App.jsx";

import "antd-mobile/dist/antd-mobile.css";
import './assets/css/common.css'

import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
