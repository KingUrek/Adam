import React from 'react';
import { ThemeProvider, Grid, makeStyles } from '@material-ui/core';
import darkTheme from './style/darkTheme';
import AllTasks from './pages/TODO/AllTasks';
import './style/app.css';
import PriorityList from './components/TODO/PriorityList';
import DayPage from './pages/TODO/DayPage';
import SideBar from './components/TODO/SideBar';
import { Route } from 'react-router-dom';
import ThisWeek from './pages/TODO/ThisWeek';
import WeekCalendarDisplay from './components/TODO/ThisWeek/WeekCalendarDisplay';

const useStyles = makeStyles((theme) => ({ container: { display: 'flex' } }));


function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        <SideBar />
        <Route path="/all" component={AllTasks} />
        <Route path="/today">
          <DayPage day="Hoje" />
        </Route>
        <Route path="/tomorrow">
          <DayPage day="Amanhã" />
        </Route>
        <Route path="/thisweek">
          <ThisWeek />
        </Route>
      </div>


    </ThemeProvider>
  );
}

export default App;
