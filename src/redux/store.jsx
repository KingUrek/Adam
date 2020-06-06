import { createStore } from 'redux';


const axios = require('axios');

const initalState = {
  TODOS: [
    {
      id: 'VEoOpNLl7Ars3TbZax4hU7p0kHiL5D',
      title: 'afs',
      checked: false,
      date: { start: '05/06/2020', startTime: '11:11', endTime: undefined },
      priority: { color: '#f44336', id: 0 },
    },
  ],
};

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
