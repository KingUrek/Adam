import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import DatePicker from 'react-date-picker';
import TimeInput from './TimeInput';
import '../../services/pt-BR';


const moment = require('moment');

moment.locale('pt-BR');

const useStyles = makeStyles((theme) => ({
  input: {
    width: '95%',
    border: '1px solid black',
    borderRadius: 2,
    backgroundColor: 'white',
  },

  wrapper: {
    width: 430,
    backgroundColor: theme.palette.background.paper,
    padding: 45,
    borderRadius: 6,
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },

  type: { color: 'white' },

  saveButton: { marginTop: theme.spacing(1.5) },
  calendar: { transition: '10s ease' },


}));

export default function Calendar({ setdate, closeModal }) {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  function sendData() {
    console.log(startTime, endTime, moment(startDate).format('L'));
    if (endTime && moment(endTime, 'HH:mm').isBefore(moment(startTime, 'HH:mm'))) {
      alert('O tempo de término deve ser depois do de começo. Não da pra voltar no tempo, não é mesmo ?');
    } else {
      setdate({ start: moment(startDate).format('L'), startTime, endTime });
      closeModal();
    }
  }


  return (
    <div className={[classes.wrapper]}>

      <label htmlFor="input">
        <Typography className={classes.type}>
          Data:
        </Typography>

        <DatePicker
          className={classes.input}
          value={startDate}
          onChange={setStartDate}
          minDate={new Date(2000, 0, 1)}
        />
      </label>

      <TimeInput setStart={setStartTime} setEnd={setEndTime} />

      <Button
        className={classes.saveButton}
        color="primary"
        disableElevation
        variant="contained"
        onClick={sendData}
      >
        Salvar

      </Button>

    </div>

  );
}
