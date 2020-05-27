import React, { useState } from 'react';
import { Checkbox, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const moment = require('moment');

moment.locale('pt-BR');


const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(0.5),
    width: '100 %',
    paddingLeft: 10,
  },
  // root: { color: orange[500] },

  hour: { margin: 0, marginLeft: 'auto', marginRight: 10 },
}));

export default function Todo({ checked: check = false, title, id, date, day }) {
  const classes = useStyles();

  const [checked, setChecked] = useState(check);


  function displayDate() {
    // TODO: em vez de mostrar a data,
    // mostrar quanto tempo falta e no hover motrar a data e o horário
    if (day === 'Hoje') {
      return (date.startTime ? moment(date.startTime, 'HH:mm').format('HH:mm') : null);
    }

    if (day === 'No Futuro') {
      return moment(date.start, 'L').format('ddd DD');
    }
  }

  return (
    <div>
      <div className={classes.card}>
        <Checkbox onChange={() => setChecked(!checked)} checked={checked} classes={{ root: classes.root }} color="primary" />
        <Typography variant="subtitle2">
          {title}
        </Typography>
        <Typography className={classes.hour} variant="paragraph">
          {/* Posso refatorar para melhorar a performace */}
          {!!date.start && displayDate()}
        </Typography>
      </div>
      <Divider variant="middle" />
    </div>
  );
}
