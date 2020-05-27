import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import darkTheme from './style/darkTheme';
import AllTasks from './pages/TODO/AllTasks';
import './style/app.css';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AllTasks />
    </ThemeProvider>
  );
}

export default App;
