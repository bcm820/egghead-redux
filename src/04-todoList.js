import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

// actions to dispatch
const addTodo = { type: 'ADD_TODO' }

// reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO': return [
        ...state,
        {
            id: action.id,
            text: action.text,
            done: false
        }
    ]
    default: return state
  }
}

// store
const store = createStore(reducer)

/**********************/

const Counter = ({value, onInc, onDec}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onInc}>+</button>
    <button onClick={onDec}>-</button>
  </div>
)

const render = () => {
  ReactDOM.render(<Counter
    value={store.getState()}
    onInc={() => store.dispatch(inc)}
    onDec={() => store.dispatch(dec)}
    />, root)
  }

export const subscribe = () => {
  store.subscribe(render)
  render()
}

export default subscribe