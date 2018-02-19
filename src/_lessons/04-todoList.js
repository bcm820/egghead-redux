import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";

/**
 * Reducer Composition Pattern
 */

// sub-reducer: list of todos
const list = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

// sub-reducer of todo list: individual todo
const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        done: false
      };
    case "TOGGLE_TODO":
      if (state.id !== action.id) return state;
      return { ...state, done: !state.done };
    default:
      return state;
  }
};

// sub-reducer: filter todo list by status ('done')
const currentFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    default:
      return state;
  }
};

// top-level reducer
// use combineReducers function w/ ES6 short-hand notation
const reducer = combineReducers({ list, currentFilter });
const store = createStore(reducer);

/**
 * Components
 */

const AddTodo = ({ onAddClick }) => {
  let input;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onAddClick(input.value);
        input.value = "";
      }}
    >
      <input name="text" ref={node => (input = node)} />
      <input type="submit" value="Add Todo" />
    </form>
  );
};

const List = ({ list, onTodoClick }) => (
  <ul>
    {list.map(todo => <Todo key={todo.id} onClick={onTodoClick} {...todo} />)}
  </ul>
);

const Filters = ({ filter, onFilterClick }) => (
  <div>
    <hr />
    Show: &nbsp;
    <Filter filter="SHOW_ALL" current={filter} onClick={onFilterClick}>
      All
    </Filter>
    &nbsp;
    <Filter filter="SHOW_ACTIVE" current={filter} onClick={onFilterClick}>
      Active
    </Filter>
    &nbsp;
    <Filter filter="SHOW_DONE" current={filter} onClick={onFilterClick}>
      Done
    </Filter>
  </div>
);

const Filter = ({ filter, current, onClick, children }) =>
  filter === current ? (
    <span>{children}</span>
  ) : (
    <a
      href="#/"
      onClick={e => {
        e.preventDefault(); // prevent nav onclick
        onClick(filter);
      }}
    >
      {children}
    </a>
  );

const filterTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ACTIVE":
      return todos.filter(t => !t.done);
    case "SHOW_DONE":
      return todos.filter(t => t.done);
    default:
      return todos;
  }
};

const Todo = ({ id, text, done, onClick }) => (
  <li
    id={id}
    onClick={onClick}
    style={{
      cursor: "pointer",
      textDecoration: done ? "line-through" : "none",
      fontStyle: done ? "italic" : "normal"
    }}
  >
    {text}
  </li>
);

// Main container component
let nextId = 0;
const App = ({ list, currentFilter }) => (
  <div>
    <AddTodo
      onAddClick={text => {
        store.dispatch({
          type: "ADD_TODO",
          id: (nextId++).toString(),
          text: text
        });
      }}
    />
    <List
      list={filterTodos(list, currentFilter)}
      onTodoClick={e => {
        store.dispatch({
          type: "TOGGLE_TODO",
          id: e.target.id
        });
      }}
    />
    <Filters
      onFilterClick={nextFilter => {
        store.dispatch({
          type: "SET_FILTER",
          filter: nextFilter
        });
      }}
    />
  </div>
);

// when rendering, instead of listing props, just spread state
const render = () => ReactDOM.render(<App {...store.getState()} />, root);

/**
 * Subscription
 */

export const subscribe = () => {
  store.subscribe(render);
  render();
};

export default subscribe;
