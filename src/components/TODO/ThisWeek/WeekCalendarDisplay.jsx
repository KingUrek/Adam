import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { PieChart, Pie, Cell } from 'recharts';
import { connect } from 'react-redux';
import moment from 'moment';

const _ = require('lodash');

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const useStyles = makeStyles((theme) => ({
  container: (props) => ({
    height: props.height,
    width: (props.height * 208) / 315,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 6,
    margin: '10px 10px',
  }),
  header: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    height: '56px',
    width: '100%',
    borderRadius: '6px 6px 0 0',
    cursor: 'pointer',
    '&:hover': { backgroundColor: theme.palette.primary.dark },
  },
  body: (props) => ({
    display: 'flex',
    position: 'relative',
    justifyItems: 'center',
    height: ((props.height * 208) / 315),
    width: (props.height * 208) / 315,
  }),
  typo: { fontSize: 24, margin: 'auto', color: 'white' },
  numberTypo: { fontSize: 30, margin: '-7px', color: 'white' },
  tarefasTypo: { fontSize: 18, margin: '-7px', color: 'white' },
  taskContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  pie: {},

}));

function formatData(TODOS, day) {
  const data = TODOS
    .filter((todo) => moment(todo.date.start, 'L').isSame(moment().day(day.id), 'day'))
    .reduce((acc, item) => {
      if (Object.keys(acc).includes(item.priority.color)) {
        acc[item.priority.color].push(item);
      } else {
        acc[item.priority.color] = [item];
      }

      return acc;
    }, {});
  if (Object.keys(data).length) {
    return Object.keys(data)
      .map((item) => ({ color: item, todos: data[item], value: data[item].length }));
  }
  return [];
}

function WeekCalendarDisplay({ setExpanded, day, height = 280, TODOS }) {
  const classes = useStyles({ height });


  const data = formatData(TODOS, day);

  return (
    <div className={classes.container}>
      <div onClick={() => setExpanded(day.day)} className={classes.header}>
        <Typography className={classes.typo}>
          {day.day}
        </Typography>

      </div>
      <div className={classes.body}>
        <div className={classes.taskContainer}>
          <Typography className={classes.numberTypo}>
            {data.reduce((sum, item) => sum + item.value, 0)}
          </Typography>
          <Typography className={classes.tarefasTypo}>
            {_.flattenDeep(Object.values(data)).length === 1 ? 'Tarefa' : 'Tarefas'}
          </Typography>
        </div>
        <PieChart
          className={classes.pie}
          width={(height * 208) / 315}
          height={((height * 208) / 315)}
        >

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={65}
            fill="white"
            stroke="none"
            animationBegin={100}
            animationDuration={1000}
            paddingAngle={_.flattenDeep(Object.values(data)).length === 1 ? 0 : 1}
          >
            {data.map((entry) => <Cell key={_.uniqueId()} stroke="0" fill={entry.color} />)}
          </Pie>
        </PieChart>

      </div>
    </div>
  );
}


function mapState({ TODOS }) {
  return { TODOS };
}

export default connect(mapState)(WeekCalendarDisplay);
