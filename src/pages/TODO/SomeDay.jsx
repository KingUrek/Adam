import React from 'react';
import { makeStyles } from '@material-ui/core';
import TaskContainer from '../../components/TODO/AllTasks/TaskContainer';

const useStyles = makeStyles(((theme) => ({
  container: {
    marginLeft: 80,
    width: 400,

  },
})));
export default function SomeDay() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <TaskContainer day="Algum Dia" />
    </div>
  );
}
