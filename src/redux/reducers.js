import { combineReducers } from 'redux';

import todoList from './reducers/todoList.reducer';
import filter from './reducers/filter.reducer';

export default combineReducers({
  todoList,
  filter
});
