import React, { useState } from 'react';
import { Paper, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => (
  {
    sidebar: { height: '100vh', borderRadius: 0 },
    typo: { color: 'white', textDecoration: 'none' },
    item: { '&:hover': { backgroundColor: theme.palette.primary.light } },
    selected: { backgroundColor: theme.palette.primary.main },
  }
));


const navNames = [
  { name: 'Todas as Tarefas', link: 'All' },
  { name: 'Hoje', link: 'today' },
  { name: 'Amanhã', link: 'tomorrow' },
  { name: 'Essa Semana', link: 'thisweek' },
  { name: 'Algum dia', link: 'someday' },
];


export default function SideBar() {
  const classes = useStyles();
  const location = useLocation();

  function createNav(navName) {
    return (
      <Link key={navName.name} style={{ textDecoration: 'none' }} to={navName.link}>
        <ListItem
          className={clsx(classes.item,
            (location.pathname.slice(1) === navName.link) && classes.selected)}
        >
          <Typography className={classes.typo} variant="h6">
            {navName.name}
          </Typography>
        </ListItem>
      </Link>
    );
  }


  return (
    <Paper className={classes.sidebar}>
      <List>
        {navNames.map(createNav)}
      </List>
    </Paper>

  );
}
