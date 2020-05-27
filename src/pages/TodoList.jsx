import React, { useState } from 'react';
import { connect } from 'react-redux';
import Todo from '../components/TODO/Todo';
import { createTodo } from '../redux/actionCreators';
import NewTodo from '../components/TODO/NewTodo';

function TodoList({ TODOS }) {
  const [addMode, setAddMode] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setAddMode(true)}>Add Todo</button>

      {addMode && <NewTodo setAddMode={setAddMode} />}

      <div>
        {TODOS.map((todo) => (
          <Todo key={todo.id} {...todo}>{todo.description}</Todo>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = ({ TODOS }) => ({ TODOS });
const mapDispatch = { createTodo };

export default connect(mapStateToProps, mapDispatch)(TodoList);
