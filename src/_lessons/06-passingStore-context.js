import React from "react";
import PropTypes from "prop-types";

const Todo = ({ id, onClick, done, text }) => (
  <li
    id={id}
    onClick={onClick}
    style={{
      cursor: "pointer",
      textDecoration: done ? "line-through" : "none"
    }}
  >
    {text}
  </li>
);

const TodoList = ({ todoList, onTodoClick }) => (
  <ul>
    {todoList.map(todo => (
      <Todo key={todo.id} onClick={onTodoClick} {...todo} />
    ))}
  </ul>
);

const Link = ({ active, onClick, children }) =>
  active ? (
    <span>{children}</span>
  ) : (
    <a
      href="#/"
      onClick={e => {
        onClick();
        e.preventDefault();
      }}
    >
      {children}
    </a>
  );

const Footer = () => (
  <div>
    <hr />
    Show:&nbsp;
    <FilterLink filter="SHOW_ALL">All</FilterLink>&nbsp;
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>&nbsp;
    <FilterLink filter="SHOW_DONE">Done</FilterLink>
  </div>
);

let nextId = 0;
const Form = (props, { store }) => {
  let input;
  return (
    <form
      onSubmit={e => {
        store.dispatch({
          type: "ADD_TODO",
          id: (nextId++).toString(),
          text: input.value
        });
        input.value = "";
        e.preventDefault();
      }}
    >
      <input name="text" ref={node => (input = node)} />
      <input type="submit" value="Add Todo" />
    </form>
  );
};

class FilterLink extends React.Component {
  componentDidMount = () => {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  };
  componentWillUnmount = () => this.unsubscribe();
  render() {
    const { store } = this.context;
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

class FilteredList extends React.Component {
  componentDidMount = () => {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  };
  componentWillUnmount = () => this.unsubscribe();
  render() {
    const { store } = this.context;
    const state = store.getState();
    const filterList = () => {
      switch (state.currentFilter) {
        case "SHOW_ACTIVE":
          return state.todoList.filter(t => !t.done);
        case "SHOW_DONE":
          return state.todoList.filter(t => t.done);
        default:
          return state.todoList;
      }
    };
    return (
      <TodoList
        todoList={filterList()}
        onTodoClick={e => {
          store.dispatch({ type: "TOGGLE_TODO", id: e.target.id });
        }}
      />
    );
  }
}

Form.contextTypes = { store: PropTypes.object };
FilteredList.contextTypes = { store: PropTypes.object };
FilterLink.contextTypes = { store: PropTypes.object };

export default () => (
  <div>
    <Form />
    <FilteredList />
    <Footer />
  </div>
);

/**
 * Reducers
 */

export const todoList = (state = [], action) => {
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

export const currentFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    default:
      return state;
  }
};
