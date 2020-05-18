import { createStore } from 'redux';

const initalState = { TODOS: [] };

function reducer(state = initalState, action) {
  switch (action.type) {
    case 'CREATE_TODO':
      return { ...state, TODOS: [...state.TODOS, action.todo] };

    case 'DELETE_TODO':
      return {
        ...state,
        TODOS: state.TODOS.filter((todo) => todo.id !== action.id),
      };

    case 'UPDATE_TODO':
      return {
        ...state,
        TODOS: [
          ...state.TODOS.filter((todo) => todo.id !== action.payload.id),
          action.payload,
        ],
      };

    default:
      return state;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
