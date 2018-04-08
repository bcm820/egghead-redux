import { combineReducers } from "redux";

import todoList from "./reducers/todoList.reducer";
import currentFilter from "./reducers/currentFilter.reducer";

export default combineReducers({
  todoList,
  currentFilter
});
