import { createStore, combineReducers } from "redux";
import todoList from "./states/todoList";
import currentFilter from "./states/currentFilter";

const reducers = {
  todoList,
  currentFilter
};

export default createStore(combineReducers(reducers));
