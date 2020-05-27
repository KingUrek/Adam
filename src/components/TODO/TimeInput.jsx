import React, { useState, useEffect } from 'react';
import { Button, makeStyles, Typography, ClickAwayListener } from '@material-ui/core';
import TimePicker from 'react-time-picker';
import anime from 'animejs/lib/anime.es';
import TimeDisplay from './TimeDisplay';

import { ReactComponent as Line } from '../../images/Line.svg';

const useStyles = makeStyles(() => ({
  button: { display: 'block' },
  buttomEnd: { marginLeft: 5 },
  typo: { color: 'white', marginRight: 5, opacity: 0 },

  timePicker: { backgroundColor: 'white', border: '1px solid black', margin: '0 5px', opacity: 0 },
  opacityClass: { opacity: 1 },

}));


export default function TimeInput({ setStart, setEnd }) {
  const classes = useStyles();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [endTimeOpen, setEndTimeOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

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

  useEffect(() => {
    anime.timeline().add({
      targets: '.timePickerAnimStart',
      opacity: 1,
      duration: 300,
      easing: 'easeOutQuint',
    }).add({
      targets: '.typoAnimStart',
      opacity: 1,
      translateX: ['150%', 0],
      duration: 300,
      easing: 'easeOutQuint',
    });
  }, [startTimeOpen]);

  useEffect(() => {
    if (editMode) {
      anime.timeline().add({
        targets: '.stroke',
        strokeDashoffset: [158, 0],
        duration: 400,
        easing: 'easeOutSine',

      }, '-=200').add({
        targets: '.timePickerAnimEnd',
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutQuint',


      }).add({
        targets: '.typoAnimEnd',
        opacity: [0, 1],
        translateX: ['-150%', 0],
        duration: 200,
        easing: 'easeOutQuint',


      }).finished.then(setEditMode(false));
    }
  }, [!!startTime, endTimeOpen]);


  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>

      {!startTimeOpen && !startTime && (
        <Button
          onClick={() => setStartTimeOpen(true)}
          classes={{ root: classes.button, label: classes.label }}
          variant="outlined"
          size="small"
        >
          Tempo
        </Button>
      )}

      {startTimeOpen && (
        <ClickAwayListener onClickAway={() => setStartTimeOpen(false)}>
          <div className="start-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
            <Typography className={`${classes.typo} typoAnimStart`}>
              Inicio
            </Typography>

            <TimePicker
              className={`${classes.timePicker} timePickerAnimStart`}
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
              <TimeDisplay onClick={() => { setEndTimeOpen(true); }} labelEnd close={() => setEndTime('')}>{endTime}</TimeDisplay>
            </>
          )}
      </div>

      {
        startTime && !endTimeOpen && !endTime && (
          <Button
            onClick={() => { setEndTimeOpen(true); setEditMode(true); }}
            classes={{ root: classes.buttomEnd, label: classes.label }}
            variant="outlined"
            size="small"
          >
            Fim?
          </Button>
        )
      }
      {
        startTime && endTimeOpen
        && (
          <>
            <Line className="LineAnim" />
            <ClickAwayListener onClickAway={() => setEndTimeOpen(false)}>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
                <TimePicker
                  style={{ opacity: 1 }}
                  className={`${classes.timePicker} ${classes.opacityClass} timePickerAnimEnd`}
                  onChange={endTimeChange}
                  value={endTime}
                  disableClock
                />

                <Typography style={{ opacity: 1 }} className={`${classes.typo} typoAnimEnd`}>
                  Final
                </Typography>
              </div>
            </ClickAwayListener>
          </>
        )
      }

    </div>

  );
}
