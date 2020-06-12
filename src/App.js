import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core';
import { Route } from 'react-router-dom';
import AllTasks from './pages/TODO/AllTasks';
import './style/app.css';
import DayPage from './pages/TODO/DayPage';
import SideBar from './components/TODO/SideBar';
import ThisWeek from './pages/TODO/ThisWeek';
import darkTheme from './style/darkTheme';
import SomeDay from './pages/TODO/SomeDay';

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
        <Route path="/someday">
          <SomeDay />
        </Route>
      </div>


    </ThemeProvider>
  );
}

export default App;
