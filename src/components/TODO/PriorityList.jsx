import React from 'react';
import { red, yellow, green } from '@material-ui/core/colors';
import { BsExclamationDiamondFill as PriorityIcon } from 'react-icons/bs';
import { List, ListItem, ListItemText, ListItemIcon, makeStyles, Divider, Popper, ClickAwayListener } from '@material-ui/core';

const priorities = (shade) => [
  { color: red[shade] },
  { color: yellow[shade] }, { color: green[shade] }, { color: null },
];

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'white',
    border: 'thin solid black',
    width: 'fit-content',
    margin: '5px 0 0 5px',
    borderRadius: 6,
  },
  item: {
    cursor: 'pointer',
    '&:hover': { backgroundColor: 'grey' },
  },
  icon: { minWidth: 30 },
}));


export default function PriorityList({ savePriority }) {
  const classes = useStyles();


  function closePopper(save) {
    savePriority(save);
  }

  function listItem(item, index, array) {
    return (
      <div key={index}>
        <ListItem onClick={() => closePopper({ ...item, id: index })} className={classes.item}>
          <ListItemIcon className={classes.icon}>
            <PriorityIcon color={item.color} />
          </ListItemIcon>
          <ListItemText primary={`Prioridade ${array.length - index}`} primaryTypographyProps={{ style: { color: item.color, paddingTop: 1 } }} />
        </ListItem>
        <Divider component="li" variant="fullWidth" />

      </div>


    );
  }


  return (

    <List className={classes.container} dense>
      {priorities(800).map(listItem)}
    </List>


  );
}
