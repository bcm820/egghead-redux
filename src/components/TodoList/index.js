import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../../redux/actions/todoList.actions';
import Todo from './Todo';

const TodoList = ({ filteredList, handleToggle }) => (
  <ul>
    {filteredList.map(todo => (
      <Todo key={todo.id} onClick={handleToggle} {...todo} />
    ))}
  </ul>
);

const mapStateToProps = ({ filter, todoList }) => {
  switch (filter) {
    case 'Active':
      return { filteredList: todoList.filter(t => !t.done) };
    case 'Done':
      return { filteredList: todoList.filter(t => t.done) };
    default:
      return { filteredList: todoList };
  }
};

const mapDispatchToProps = dispatch => {
  return { handleToggle: e => dispatch(toggleTodo(e.target.id)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
