import { createStore } from 'redux';


const axios = require('axios');

const initalState = { TODOS: [] };

function reducer(state = initalState, action) {
  switch (action.type) {
    case 'CREATE_TODO':
      // axios.post(`${process.env.REACT_APP_PATH_NAME}/todo`, action.todo).then((res) => console.log(res));
      return { ...state, TODOS: [...state.TODOS, action.todo] };

    case 'DELETE_TODO':
      axios.delete(`${process.env.REACT_APP_PATH_NAME}/todo`, { data: { id: action.id } }).then((res) => console.log(res));
      return {
        ...state,
        TODOS: state.TODOS.filter((todo) => todo.id !== action.id),
      };

    case 'UPDATE_TODO':
      axios.put(`${process.env.REACT_APP_PATH_NAME}/todo`, action.payload).then((res) => console.log(res));
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
