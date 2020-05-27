import React from 'react';
import { MdClose } from 'react-icons/md';
import { makeStyles, Typography } from '@material-ui/core';
import moment from 'moment';
import { blue } from '@material-ui/core/colors';


const useStyle = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    border: `thin solid ${blue[500]}`,
    padding: '0 5px',
    backgroundColor: 'rgba(33, 150, 243, 0.17)',
  },
  typo: { fontSize: 12, color: blue[500] },
  button: { marginLeft: 5, color: blue[500] },
}));
export default function InputTimeAdornant({ children }) {
  const classes = useStyle();
  return (
    children ? (
      <div className={classes.wrapper}>
        <Typography noWrap className={classes.typo}>
          {moment(children, 'L').format('MMM D')}
        </Typography>
        <MdClose className={classes.button} size={10} />
      </div>
    ) : null
  );
}
