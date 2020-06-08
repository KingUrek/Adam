import React, { useState, useEffect } from 'react';
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

const panels = [
  { day: 'Domingo', id: 0 },
  { day: 'Segunda', id: 1 },
  { day: 'Terça', id: 2 },
  { day: 'Quarta', id: 3 },
  { day: 'Quinta', id: 4 },
  { day: 'Sexta', id: 5 },
  { day: 'Sábado', id: 6 },
];


function ExpansionWeekContainer({ shouldExpand, day, TODOS, setClockType }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(panels.find(({ id }) => id === moment().day()).day);

  console.log(moment().day());

  useEffect(() => {
    if (shouldExpand) {
      setExpanded(shouldExpand);
    }
  }, [shouldExpand]);


  return (
    <Paper elevation={3} className={classes.paper}>

      <Typography className={classes.typo} align="center" variant="h4">
        Essa Semana
      </Typography>
      <InsertTodo containerType={day} expandedPainel={panels.find(({ day }) => day === expanded)} />

      <div className={classes.expansionContainer}>

        { panels.map((panel) => (
          <ExpansionPanel
            square
            expanded={expanded === panel.day}
            onClick={() => setExpanded(panel.day)}
            elevation={0}
          >
            <ExpansionPanelSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{panel.day}</Typography>

            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              { TODOS
                .filter((todo) => moment(todo.date.start, 'L').isSame(moment().day(panel.id), 'day'))
                .map((todo) => <Todo day="Hoje" {...todo} key={todo.id} />)}
            </ExpansionPanelDetails>

          </ExpansionPanel>
        ))}


      </div>


    </Paper>
  );
}

function mapState(state) {
  return ({ TODOS: state.TODOS });
}


export default connect(mapState)(ExpansionWeekContainer);
