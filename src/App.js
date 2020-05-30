import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import darkTheme from './style/darkTheme';
import AllTasks from './pages/TODO/AllTasks';
import './style/app.css';
import PriorityList from './components/TODO/PriorityList';
import DayPage from './pages/TODO/DayPage';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* <AllTasks /> */}
      <DayPage />
    </ThemeProvider>
  );
}

export default App;
