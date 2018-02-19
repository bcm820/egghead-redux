// import React from 'react'
// import ReactDOM from 'react-dom'
// import { createStore } from 'redux'

/* Avoiding Array Mutations
When updating state, we do not mutate and return the same objects. Rather, we return modified copies. Notice below how we use the spread operator and specific array methods to return a brand new array rather than a modified array.
*/

// Adding a counter
const addCounter = list => [...list, 0]
// list.concat([0])

// Removing a counter
const removeCounter = (list, idx) => [
  ...list.slice(0, idx), ...list.slice(idx + 1)
] // list.slice(0, idx).concat(list.slice(idx + 1))

// Incrementing a counter
const incrementCounter = (list, idx) => [
  ...list.slice(0, idx), list[idx] + 1, ...list.slice(idx + 1)
] // list.slice(0, idx).concat([list[idx] + 1]).concat(list.slice(idx + 1))

/* Avoiding Object Mutations
When working with objects, we also return modified copies. This is easy to do using the Object.assign method as well as the spread operator.
*/

// Toggling a boolean property (e.g. Todo)
const toggleTodo = todo => {
  return { ...todo, done: !todo.done }
} // Object.assign({}, todo, {done: !todo.done})

