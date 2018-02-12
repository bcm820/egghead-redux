
/**
 * For easy testing, paste to index.js
 */

import expect from 'expect'
import deepFreeze from 'deep-freeze'

// top-level todo list reducer
const reducer = (state = [], action) => {
  switch (action.type) {
      // calls 'helper' reducer to delegate and abstract updates
      case 'ADD_TODO': return [ ...state, helper(null, action) ]
      case 'TOGGLE_TODO': return state.map(t => helper(t, action))
      default: return state
  }
}

// helper reducer for individual todos
const helper = (todo, action) => {
  switch (action.type) {
      case 'ADD_TODO': return {
          id: action.id,
          text: action.text,
          done: false
      }
      case 'TOGGLE_TODO':
          if (todo.id !== action.id) return todo
          return { ...todo, done: !todo.done }
      default: return todo
  }
}

// test addTodo
const testAddTodo = () => {
  const before = []
  const after = [ { id: 0, text: 'Learn Redux', done: false } ]
  const action = { type: 'ADD_TODO', id: 0, text: 'Learn Redux' }
  deepFreeze(before) // throw error if prior state mutated
  deepFreeze(action) // throw error if action mutated
  expect(reducer(before, action)).toEqual(after)
}

// test toggleTodo
const testToggleTodo = () => {
  const before = [
    { id: 0, text: 'Learn Redux', done: false },
    { id: 1, text: 'Get to work', done: false }
  ]
  const after = [
    { id: 0, text: 'Learn Redux', done: false },
    { id: 1, text: 'Get to work', done: true }
  ]
  const action = { type: 'TOGGLE_TODO', id: 1 }
  deepFreeze(before)
  deepFreeze(action)
  expect(reducer(before, action)).toEqual(after)
}

// testAddTodo()
testToggleTodo()
console.log('All tests passed')