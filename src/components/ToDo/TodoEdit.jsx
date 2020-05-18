import React, { useState } from 'react';
import { Card, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createTodo, deleteTodo, updateTodo } from '../../redux/actionCreators';

const useStyles = makeStyles({
  card: ({ x, y }) => ({
    position: 'absolute',
    width: 400,
    top: y,
    left: x,
  }),
});

function TodoEdit({ position, description: desc, updateTodo, id, setEditMode }) {
  const classes = useStyles(position);
  const [description, setDescription] = useState(desc);

  function saveEdit() {
    updateTodo({ id, description });
    console.log('seu todo foi atulizado');
    setEditMode(false);
  }


  return (
    <Card className={classes.card} variant="outlined">
      <TextField value={description} onChange={(e) => setDescription(e.target.value)} size="small" />
      <Button onClick={saveEdit} variant="outlined"> Salvar </Button>
    </Card>
  );
}

const mapDispatchToProps = { createTodo, deleteTodo, updateTodo };
const mapState = () => { };

export default connect(mapState, mapDispatchToProps)(TodoEdit);
