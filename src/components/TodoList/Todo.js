import React from 'react';

const Todo = ({ id, onClick, done, text }) => (
  <li
    id={id}
    onClick={onClick}
    style={{
      cursor: 'pointer',
      textDecoration: done ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
);

export default Todo;
