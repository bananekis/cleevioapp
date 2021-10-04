import "./index.css";
import { Provider as AlertProvider } from "react-alert";
import { alertOptions } from "./config";
import CleevioApp from "./main-app/CleevioApp";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
//@ts-ignore
import AlertTemplate from "react-alert-template-basic";

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <CleevioApp />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
