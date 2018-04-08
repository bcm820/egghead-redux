import React from 'react';
import FilterLink from './FilterLink';

const FilterList = () => (
  <div>
    <hr />
    Show:
    <ul>
      <FilterLink filter="All" />
      <FilterLink filter="Active" />
      <FilterLink filter="Done" />
    </ul>
  </div>
);

export default FilterList;
