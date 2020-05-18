import React, { useState } from 'react';
import { connect } from 'react-redux';
import Todo from '../components/ToDo/Todo';
import { createTodo } from '../redux/actionCreators';
import NewTodo from '../components/ToDo/NewTodo';

function TodoList({ TODOS }) {
  const [addMode, setAddMode] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setAddMode(true)}>Add Todo</button>

      {addMode && <NewTodo setAddMode={setAddMode} />}

      <div>
        {TODOS.map((todo) => (
          <Todo {...todo}>{todo.description}</Todo>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = ({ TODOS }) => ({ TODOS });
const mapDispatch = { createTodo };

export default connect(mapStateToProps, mapDispatch)(TodoList);
