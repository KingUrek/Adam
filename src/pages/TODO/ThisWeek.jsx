import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import ExpansionWeekContainer from '../../components/TODO/ThisWeek/ExpansionWeekContainer';
import WeekCalendarDisplay from '../../components/TODO/ThisWeek/WeekCalendarDisplay';


const useStyle = makeStyles(() => ({
  container: { display: 'flex', width: '90%' },
  task: { margin: '0 0 0 80px', width: '40vw' },
  calendarContainer: {
    display: 'flex ',
    width: 1200,
    height: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const panels = [
  { day: 'Domingo', id: 0 },
  { day: 'Segunda', id: 1 },
  { day: 'Terça', id: 2 },
  { day: 'Quarta', id: 3 },
  { day: 'Quinta', id: 4 },
  { day: 'Sexta', id: 5 },
  { day: 'Sábado', id: 6 },
];

function ThisWeek() {
  const classes = useStyle();
  const [expanded, setExpanded] = React.useState();
  return (

    <div className={classes.container}>
      <div className={classes.task}>
        <ExpansionWeekContainer shouldExpand={expanded} day="Essa semana" />
      </div>
      <div className={classes.calendarContainer}>
        {panels.map((day) => <WeekCalendarDisplay setExpanded={setExpanded} day={day} />)}
      </div>


    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ThisWeek);
