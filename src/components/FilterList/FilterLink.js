import React from 'react';
import { connect } from 'react-redux';
import setFilter from '../../redux/actions/filter.actions';

const Link = ({ active, filterTodos, filter }) =>
  active ? (
    <li>{filter}</li>
  ) : (
    <li>
      <a
        href="#/"
        onClick={e => {
          filterTodos();
          e.preventDefault();
        }}
      >
        {filter}
      </a>
    </li>
  );

const mapStateToProps = ({ filter }, ownProps) => {
  return { active: filter === ownProps.filter };
};

const mapDispatchToProps = (dispatch, { filter }) => {
  return {
    filterTodos: () => {
      dispatch(setFilter(filter));
    }
  };
};

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;
