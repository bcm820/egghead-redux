import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'

/**
 * Reducer Composition Pattern
*/

// sub-reducer: todo list
const list = (state = [], action) => {
  switch (action.type) {
      // calls 'todo' reducer to delegate and abstract updates
      case 'ADD_TODO': return [ ...state, todo(undefined, action) ]
      case 'TOGGLE_TODO': return state.map(t => todo(t, action))
      default: return state
  }
}

// sub-reducer of todo list: todo
const todo = (state, action) => {
  switch (action.type) {
      case 'ADD_TODO': return {
        id: action.id,
        text: action.text,
        done: false
      }
      case 'TOGGLE_TODO':
        if (state.id !== action.id) return state
        return { ...state, done: !state.done }
      default: return state
  }
}

// sub-reducer: filter list
const filter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER': return action.filter
    default: return state
  }
}

// top-level reducer
// use Redux's combineReducers function
const reducer = combineReducers({ list, filter })
const store = createStore(reducer)

/**
 * Dispatching actions
 */

const addTodo = e => {
  e.preventDefault()
  const text = e.target.elements.text.value
  e.target.elements.text.value = ""
  return store.dispatch({
    type: 'ADD_TODO',
    id: Date.now().toString(10),
    text: text,
    done: false
  })
}

const toggleTodo = e => {
  return store.dispatch({
    type: 'TOGGLE_TODO',
    id: e.target.id
  })
}

/**
 * React App
 */

const App = () => {
  return <div>
    <h1>Todo List</h1>
    <form onSubmit={addTodo}>
    <input name="text"/>
    <input type="submit" value="Add"/>
    </form>
    { store.getState().list.length > 0
    ? (<div>
        {store.getState().list.map(t => 
          <div key={t.id}>
          <p>
            todo: {t.text}<br/>
            status: {t.done ? 'done' : 'in progress'}<br/>
            <button
              onClick={toggleTodo}
              id={t.id}
            >toggle</button>
          </p>
          <hr/>
          </div>
        )}
      </div>)
    : '' }
  </div>
}

const render = () => ReactDOM.render(<App/>, root)

/**
 * Subscription
 */

export const subscribe = () => {
  store.subscribe(render)
  render()
}

export default subscribe