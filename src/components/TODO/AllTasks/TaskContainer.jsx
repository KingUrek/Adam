import React from 'react';
import { Paper, makeStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import moment from 'moment';
import Todo from '../Todo';
import InsertTodo from '../InsertTodo';

const useStyles = makeStyles((theme) => ({
  paper: { height: '95vh', position: 'relative', margin: 10, overflowY: 'auto' },
  typo: { padding: 20 },
}));


function TaskContainer({ day, TODOS }) {
  const classes = useStyles();

  function filterTodo(todo) {
    if (day === 'Hoje' && todo.date.start) {
      return moment(todo.date.start, 'L').isSame(moment(), 'day');
    }
    if (day === 'No Futuro' && todo.date.start) {
      return !moment(todo.date.start, 'L').isSame(moment(), 'day');
    }
    if (day === 'Algum Dia') {
      return !todo.date.start;
    }
  }

  return (
    <Paper elevation={3} className={classes.paper}>

      <Typography className={classes.typo} align="center" variant="h4">
        {day}
      </Typography>
      <InsertTodo />
      <div>
        {TODOS.filter(filterTodo).map((todo) => <Todo day={day} {...todo} key={todo.id} />)}
      </div>


    </Paper>
  );
}

function mapState(state) {
  return ({ TODOS: state.TODOS });
}


export default connect(mapState)(TaskContainer);
