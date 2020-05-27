import React from 'react';
import { Paper, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => (
  {
    sidebar: { height: '100vh', borderRadius: 0 },
    selected: { backgroundColor: theme.palette.primary.main },
  }
));


export default function SideBar() {
  const classes = useStyles();
  return (
    <Paper className={classes.sidebar}>
      <List>
        <ListItem className={classes.selected}>
          <Typography variant="h6">
            Todas as Tarefas
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">
            Hoje
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">
            Amanhã
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">
            essa semana
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">
            Algum dia
          </Typography>
        </ListItem>
      </List>
    </Paper>

  );
}
