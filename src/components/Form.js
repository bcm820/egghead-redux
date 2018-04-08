import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/actions/todoList.actions';

const Form = ({ addTodo }) => {
  const handleKeyPress = e => {
    if (e.key === 'Enter' && e.target.value !== '') {
      addTodo(e.target.value);
      e.target.value = '';
    }
  };
  return <input placeholder="Add item here" onKeyPress={handleKeyPress} />;
};

export default connect(undefined, { addTodo })(Form);
