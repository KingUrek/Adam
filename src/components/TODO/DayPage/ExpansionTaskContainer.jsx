import React, { useState } from 'react';
import { Paper, makeStyles, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { connect } from 'react-redux';
import moment from 'moment';
import { MdExpandMore } from 'react-icons/md';
import Todo from '../Todo';
import InsertTodo from '../InsertTodo';

const useStyles = makeStyles((theme) => ({
  paper: { height: '95vh', position: 'relative', margin: 10, overflowY: 'auto' },
  typo: { padding: 20 },

  expansionContainer: { marginTop: 20 },
}));

const ExpansionPanel = withStyles({
  root: {
    '&:not(:last-child)': { borderBottom: '1px solid rgba(0, 0, 0, .125)' },
    boxShadow: 'none',
    // '&:last-child': { borderBottom: 0 },
    '&:before': { display: 'none' },
    '&$expanded': { margin: 'auto' },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': { minHeight: 56, borderBottom: '1px solid rgba(0, 0, 0, .125)' },
  },
  content: { '&$expanded': { margin: '12px 0' } },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, .07)',
    '&:last-child': { borderBottom: '1px solid rgba(0, 0, 0, .125)' },
  },
}))(MuiExpansionPanelDetails);


function ExpansionTaskContainer({ day, TODOS }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState('AM');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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

  function filterByTime(time) {
    if (time === 'AM') {
      return (todo) => moment(todo.date.startTime, 'H:m').isBefore(moment().hour(12).minutes(0));
    }
    if (time === 'PM') {
      return (todo) => moment(todo.date.startTime, 'H:m').isAfter(moment().hour(12).minutes(0));
    }
    if (time === 'AH') {
      return (todo) => !todo.date.startTime;
    }
  }

  return (
    <Paper elevation={3} className={classes.paper}>

      <Typography className={classes.typo} align="center" variant="h4">
        {day}
      </Typography>
      <InsertTodo />

      <div className={classes.expansionContainer}>


        <ExpansionPanel square expanded={expanded === 'AM'} onChange={handleChange('AM')} elevation={0}>
          <ExpansionPanelSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>AM</Typography>

          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            {TODOS.filter(filterTodo).filter(filterByTime('AM')).map((todo) => <Todo day={day} {...todo} key={todo.id} />)}
          </ExpansionPanelDetails>

        </ExpansionPanel>

        <ExpansionPanel square expanded={expanded === 'PM'} onChange={handleChange('PM')} elevation={0}>
          <ExpansionPanelSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>PM</Typography>

          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            {TODOS.filter(filterTodo).filter(filterByTime('PM')).map((todo) => <Todo day={day} {...todo} key={todo.id} />)}
          </ExpansionPanelDetails>

        </ExpansionPanel>

        <ExpansionPanel square expanded={expanded === 'AH'} onChange={handleChange('AH')} elevation={0}>
          <ExpansionPanelSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Alguma Hora</Typography>

          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            {TODOS.filter(filterTodo).filter(filterByTime('AH')).map((todo) => <Todo day={day} {...todo} key={todo.id} />)}
          </ExpansionPanelDetails>

        </ExpansionPanel>
        {/* <div>
        {TODOS.filter(filterTodo).map((todo) => <Todo day={day} {...todo} key={todo.id} />)}
      </div> */}
      </div>


    </Paper>
  );
}

function mapState(state) {
  return ({ TODOS: state.TODOS });
}


export default connect(mapState)(ExpansionTaskContainer);
