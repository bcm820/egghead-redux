let nextId = 1;
export default text => ({ type: "ADD_TODO", id: nextId++, text });
