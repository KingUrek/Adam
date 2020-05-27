import React, { useState } from 'react';
import { Button, makeStyles, Typography, ClickAwayListener } from '@material-ui/core';
import TimePicker from 'react-time-picker';
import TimeDisplay from './TimeDisplay';
import { ReactComponent as Line } from '../../images/Line.svg';

const useStyles = makeStyles(() => ({
  button: { display: 'block' },
  buttomEnd: { marginLeft: 5 },
  typo: { color: ' white', marginRight: 5 },

  timePicker: { backgroundColor: 'white', border: '1px solid black', margin: '0 5px' },

}));

export default function TimeInput({ setStart, setEnd }) {
  const classes = useStyles();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [endTimeOpen, setEndTimeOpen] = useState(false);

  function closeStartTime() {
    setStartTime('');
    setEndTime('');
  }

  function startTimeChange(time) {
    setStart(time);
    setStartTime(time);
  }

  function endTimeChange(time) {
    setEnd(time);
    setEndTime(time);
  }


  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>

      {!startTimeOpen && !startTime && (
        <Button
          onClick={() => setStartTimeOpen(true)}
          classes={{ root: classes.button, label: classes.label }}
          variant="outlined"
          color="white"
          size="small"
        >
          Tempo
        </Button>
      )}

      {startTimeOpen && (
        <ClickAwayListener onClickAway={() => setStartTimeOpen(false)}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography className={classes.typo}>
              Inicio
            </Typography>

            <TimePicker
              className={classes.timePicker}
              onChange={startTimeChange}
              value={startTime}
              disableClock
            />
          </div>
        </ClickAwayListener>
      )}


      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!startTimeOpen && !!startTime
          && (
            <TimeDisplay
              close={closeStartTime}
              labelStart
              onClick={() => setStartTimeOpen(true)}
            >
              {startTime}
            </TimeDisplay>
          )}

        {!endTimeOpen && !!endTime && startTime
          && (
            <>
              <Line />
              <TimeDisplay onClick={() => setEndTimeOpen(true)} labelEnd close={() => setEndTime('')}>{endTime}</TimeDisplay>
            </>
          )}
      </div>

      {startTime && !endTimeOpen && !endTime && (
        <Button
          onClick={() => setEndTimeOpen(true)}
          classes={{ root: classes.buttomEnd, label: classes.label }}
          variant="outlined"
          color="white"
          size="small"
        >
          Fim?
        </Button>
      )}
      {startTime && endTimeOpen
        && (
          <>
            <Line />
            <ClickAwayListener onClickAway={() => setEndTimeOpen(false)}>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
                <TimePicker
                  className={classes.timePicker}
                  onChange={endTimeChange}
                  value={endTime}
                  disableClock
                />

                <Typography className={classes.typo}>
                  Final
                </Typography>
              </div>
            </ClickAwayListener>
          </>
        )}

    </div>

  );
}
