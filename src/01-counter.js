import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

// actions to dispatch
const inc = { type: 'INC' }
const dec = { type: 'DEC' }

// reducer
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INC': return state + 1
    case 'DEC': return state - 1
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