import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import darkTheme from './style/darkTheme';
import AllTasks from './pages/TODO/AllTasks';
import './style/app.css';
import PriorityList from './components/TODO/PriorityList';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AllTasks />
      {/* <PriorityList /> */}
    </ThemeProvider>
  );
}

export default App;
