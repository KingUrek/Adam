import React from 'react';
import { MdClose } from 'react-icons/md';
import { makeStyles, Typography } from '@material-ui/core';


const useStyle = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    border: `1px solid ${theme.palette.primary.main}`,
    width: 'fit-content',
    padding: '3px 5px',
    borderRadius: 5,
    alignItems: 'center',
    margin: '0px 10px',
  },
  typo: { color: theme.palette.primary.main, fontSize: 12 },
  button: { color: theme.palette.primary.main, marginLeft: theme.spacing(1), cursor: 'pointer' },
  container: { display: 'flex' },
  label: { color: 'white' },
}));
export default function TimeDisplay({ children, labelStart, labelEnd, close, onClick }) {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      {labelStart && (
        <Typography className={classes.label}>
          Inicio
        </Typography>
      )}
      <div className={classes.wrapper}>
        <Typography onClick={onClick} className={classes.typo}>
          {children}
        </Typography>
        <MdClose className={classes.button} onClick={close} size={15} />
      </div>
      {labelEnd && (
        <Typography className={classes.label}>
          Final
        </Typography>
      )}
    </div>
  );
}
