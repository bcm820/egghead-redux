const generateId = () => Math.floor(Math.random() * 100);

const addTodo = text => {
  return { type: 'ADD_TODO', id: `${generateId()}-${text}`, text };
};

const toggleTodo = id => ({ type: 'TOGGLE_TODO', id });

export { addTodo, toggleTodo };
