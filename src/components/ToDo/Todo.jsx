import React, { useState } from 'react';
import { Card, Checkbox, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createTodo, deleteTodo, updateTodo } from '../../redux/actionCreators';
import TodoEdit from './TodoEdit';

const useStyles = makeStyles(() => ({ card: { width: 400 } }));

function Todo({ checked: check, children: description, id, deleteTodo }) {
  const classes = useStyles();
  const [position, setPosition] = useState('');
  const [checked, setChecked] = useState(check);
  const [editMode, setEditMode] = useState(false);

  function toggleEditMode(e) {
    const target = e.currentTarget;
    setPosition(target.parentNode.getBoundingClientRect());
    setEditMode(true);
  }

  return (
    <>
      <Card className={classes.card} variant="outlined">
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <Button onClick={() => deleteTodo(id)}>
          delete
        </Button>
        <Typography variant="body1" display="inline" align="center">
          {description}
        </Typography>
        <button type="button" style={{ margin: 10 }} onClick={toggleEditMode}>
          EDIT
        </button>
      </Card>
      {editMode ? (
        <TodoEdit
          position={position}
          description={description}
          id={id}
          setEditMode={setEditMode}
        />
      ) : null}

    </>

  );
}

const mapDispatchToProps = { createTodo, deleteTodo, updateTodo };
const mapState = () => { };

export default connect(mapState, mapDispatchToProps)(Todo);
