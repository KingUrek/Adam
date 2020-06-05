import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Clock from '../../components/TODO/DayPage/Clock';
import TaskContainer from '../../components/TODO/AllTasks/TaskContainer';
import ExpansionTaskContainer from '../../components/TODO/DayPage/ExpansionTaskContainer';

const useStyle = makeStyles(() => ({
  container: { display: 'flex', width: '100%' },
  task: { margin: '0 0 0 80px', width: '40vw' },
}));

export default function DayPage({ day }) {
  const classes = useStyle();
  const ref = useRef();
  const [clockType, setClockType] = useState('AM');
  return (
    <div className={classes.container}>
      <div className={classes.task}>
        <ExpansionTaskContainer setClockType={setClockType} day={day} />
      </div>

      <div ref={ref} style={{ width: '100%' }}>
        <Clock day={day} type={clockType} />
      </div>


    </div>

  );
}
