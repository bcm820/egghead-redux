import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";

/**
 * Reducer Composition Pattern
 */

// sub-reducer: list of todos
const list = (state = [], action) => {
  switch (action.type) {
    // calls 'todo' reducer to delegate and abstract updates
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
const filter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    default:
      return state;
  }
};

// top-level reducer
// use combineReducers function w/ ES6 short-hand notation
const reducer = combineReducers({ list, filter });
const store = createStore(reducer);

/**
 * Dispatching actions
 */

let nextId = 0;

// function that dispatches action
const addTodo = e => {
  e.preventDefault();
  store.dispatch({
    type: "ADD_TODO",
    id: (nextId++).toString(),
    text: e.target.elements.text.value,
    done: false
  });
  e.target.elements.text.value = "";
};

const setFilter = filter => {
  store.dispatch({
    type: "SET_FILTER",
    filter
  });
};

/**
 * React App
 */

const FilterLink = ({ filter, current, children }) =>
  filter === current ? (
    <span>{children}</span>
  ) : (
    <a
      href="#/"
      onClick={e => {
        e.preventDefault(); // prevent nav onclick
        setFilter(filter);
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

const List = ({ list, onTodoClick }) => (
  <ul>
    {list.map(todo => <Todo key={todo.id} onClick={onTodoClick} {...todo} />)}
  </ul>
);

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

const App = ({ list, filter }) => {
  const filteredList = filterTodos(list, filter);
  return (
    <div>
      <h1>Todo List</h1>

      <form onSubmit={addTodo}>
        <input name="text" />
        <input type="submit" value="Add" />
      </form>

      {list.length > 0 ? (
        <div>
          <FilterLink filter="SHOW_ALL" current={filter}>
            All
          </FilterLink>{" "}
          &nbsp;
          <FilterLink filter="SHOW_ACTIVE" current={filter}>
            Active
          </FilterLink>{" "}
          &nbsp;
          <FilterLink filter="SHOW_DONE" current={filter}>
            Done
          </FilterLink>
          <hr />
          <List
            list={filteredList}
            onTodoClick={e => {
              store.dispatch({
                type: "TOGGLE_TODO",
                id: e.target.id
              });
            }}
          />
        </div>
      ) : (
        <span />
      )}
    </div>
  );
};

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
