import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";

/**
 * Reducers
 */

const todoList = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

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

const currentFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const reducer = combineReducers({ todoList, currentFilter });
const store = createStore(reducer);

/**
 * Components
 */

let nextId = 0;
const Form = () => {
  let input;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        store.dispatch({
          type: "ADD_TODO",
          id: (nextId++).toString(),
          text: input.value
        });
        input.value = "";
      }}
    >
      <input name="text" ref={node => (input = node)} />
      <input type="submit" value="Add Todo" />
    </form>
  );
};

const TodoList = ({ todoList, onTodoClick }) => (
  <ul>
    {todoList.map(todo => (
      <Todo key={todo.id} onClick={onTodoClick} {...todo} />
    ))}
  </ul>
);

const Footer = () => (
  <div>
    <hr />
    Show: &nbsp;
    <Filter filter="SHOW_ALL">All</Filter>
    &nbsp;
    <Filter filter="SHOW_ACTIVE">Active</Filter>
    &nbsp;
    <Filter filter="SHOW_DONE">Done</Filter>
  </div>
);

const Link = ({ active, onClick, children }) =>
  active ? (
    <span>{children}</span>
  ) : (
    <a
      href="#/"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );

class Filter extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const props = this.props;
    const state = store.getState();
    return (
      <Link
        active={props.filter === state.currentFilter}
        onClick={() =>
          store.dispatch({ type: "SET_FILTER", filter: props.filter })
        }
      >
        {props.children}
      </Link>
    );
  }
}

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

class FilteredList extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const state = store.getState();
    return (
      <TodoList
        todoList={filterTodos(state.todoList, state.currentFilter)}
        onTodoClick={e => {
          store.dispatch({ type: "TOGGLE_TODO", id: e.target.id });
        }}
      />
    );
  }
}

// Main container component
const App = () => (
  <div>
    <Form />
    <FilteredList />
    <Footer />
  </div>
);

// when rendering, instead of listing props, just spread state
const render = () => ReactDOM.render(<App {...store.getState()} />, root);

export default render;
