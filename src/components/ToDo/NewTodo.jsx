
import React, { useState } from 'react';
import { Card, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createTodo } from '../../redux/actionCreators';

const randomId = require('random-id');

const useStyles = makeStyles(() => ({
  input: { color: 'white', margin: 10, fontSize: 15, padding: 0, width: 500 },
  card: { width: 600 },
  button: { margin: '0 10px 10px 10px', display: 'block' },

}));

function NewTodo({ setAddMode, createTodo }) {
  const [text, setText] = useState('');
  const classes = useStyles();

  function sendTask(e) {
    e.preventDefault();

    console.log('send task');
    createTodo({ id: randomId(), description: text });
    setAddMode(false);
  }
  return (
    <Card className={classes.card} variant="outlined">
      <form>
        <TextField size="small" className={classes.input} onChange={(e) => (setText(e.target.value))} value={text} placeholder="Qual sua nova tarefa" variant="outlined" />
        <Button className={classes.button} type="submit" onClick={sendTask} color="primary" variant="outlined">
          Adicionar
        </Button>
      </form>
    </Card>
  );
}

const mapDispatch = { createTodo };
const mapProps = () => { };

export default connect(mapProps, mapDispatch)(NewTodo);
