export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

export const createTodo = (todo) => ({
  type: CREATE_TODO,
  todo,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  id,
});

export const updateTodo = (payload) => ({
  type: UPDATE_TODO,
  payload,
});
