import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppContainer from "./components/AppContainer";
import store from "./store";
import "./index.css";

const reducer = combineReducers({ todoList, currentFilter });
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
