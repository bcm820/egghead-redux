import React from "react";
import { connect } from "react-redux";

/**
 * Action Creators
 */

let nextId = 1;
const addTodo = text => ({ type: "ADD_TODO", id: nextId++, text });
const setFilter = filter => ({ type: "SET_FILTER", filter });
const toggleTodo = id => ({ type: "TOGGLE_TODO", id });

/**
 * Presentational Components
 */

const Todo = ({ id, onClick, done, text }) => (
  <li
    id={id}
    onClick={onClick}
    style={{
      cursor: "pointer",
      textDecoration: done ? "line-through" : "none"
    }}
  >
    {id}. {text}
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

let Form = ({ dispatch }) => {
  let input;
  return (
    <input
      placeholder="Add item here"
      ref={node => (input = node)}
      onKeyPress={e => {
        if (e.key !== "Enter" || input.value === "") return;
        dispatch(addTodo(input.value));
        input.value = "";
      }}
    />
  );
};
// connect's default behavior is to inject dispatch as a prop
Form = connect()(Form);

const mapStateToFilterLinkProps = (state, ownProps) => {
  return { active: ownProps.filter === state.currentFilter };
};

const mapDispatchToFilterLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setFilter(ownProps.filter));
    }
  };
};

const FilterLink = connect(
  mapStateToFilterLinkProps,
  mapDispatchToFilterLinkProps
)(Link);

const mapStateToFilterListProps = state => {
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
  return { todoList: filterList() };
};
const mapDispatchToFilterListProps = dispatch => {
  return {
    onTodoClick: e => dispatch(toggleTodo(parseInt(e.target.id, 10)))
  };
};
const FilteredList = connect(
  mapStateToFilterListProps,
  mapDispatchToFilterListProps
)(TodoList);

export default () => (
  <div>
    <Form />
    <FilteredList />
    <Footer />
  </div>
);
