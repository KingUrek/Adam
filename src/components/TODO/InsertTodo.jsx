import React, { useState } from 'react';
import { TextField, makeStyles, Button, Modal, ClickAwayListener, Popper } from '@material-ui/core';
import { connect } from 'react-redux';
import { AiFillCalendar as CalendarIcon } from 'react-icons/ai';
import { BsExclamationDiamondFill as PriorityIcon } from 'react-icons/bs';
import { createTodo } from '../../redux/actionCreators';
import Calendar from './Calendar';
import InputTimeAdornant from './InputTimeAdornant';
import PriorityList from './PriorityList';

const randomId = require('random-id');

const useStyles = makeStyles((theme) => ({
  TextField: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.06);',
  },

  input: { fontSize: 14, padding: '8px 8px' },
  form: { display: 'flex', padding: '0px 20px', flexDirection: 'column' },

  icon: {
    color: theme.palette.primary.main,
    paddingRight: theme.spacing(0.7),
    cursor: 'pointer',
    '&:hover': { color: 'white' },

  },

  button: { alignSelf: 'flex-start', marginTop: theme.spacing(1) },
}));

function InsertTodo({ createTodo }) {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState({});
  const [piority, setPiority] = useState(null);
  const [focus, setFocus] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [popperSets, setPopper] = useState({ popper: false });

  function newTodo(e) {
    e.preventDefault();

    const todo = {
      id: randomId(),
      title,
      checked: false,
      date: { ...date },
    };
    setTitle('');
    createTodo(todo);
    setDate('');
  }


  function clickAway() {
    setFocus(false);
  }

  function callPopper(e) {
    const popperProps = { arrowRef: e.currentTarget, popper: true };
    setPopper(popperProps);
  }

  function savePriority(priority) {
    const popperProps = { arrowRef: null, popper: false };
    setPopper(popperProps);
    setPiority(priority);
  }

  return (
    <>
      <ClickAwayListener onClickAway={clickAway}>
        <form
          onSubmit={newTodo}
          className={classes.form}
          onFocus={() => setFocus(true)}
        >
          <div style={{ height: 16, marginBottom: 10 }}>
            {focus && title
              && (
                <div style={{ display: 'flex', height: 16 }} className="icons-div">
                  <CalendarIcon onClick={() => setModalOpen(true)} className={classes.icon} />
                  <PriorityIcon onClick={callPopper} className={classes.icon} />
                </div>
              )}

          </div>
          <TextField
            style={{ display: 'flex' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={classes.TextField}
            InputProps={{
              classes: { input: classes.input },
              endAdornment: <InputTimeAdornant resetDate={() => setDate({})}>{date.start}</InputTimeAdornant>,
            }}
            variant="outlined"
            placeholder="Adicionar tarefa"
          />
          {focus && (
            <Button
              className={classes.button}
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              disableElevation
              disabled={!title}
            >
              Adicionar

            </Button>
          )}
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <div>
              <Calendar setdate={setDate} closeModal={() => setModalOpen(false)} />
            </div>
          </Modal>


          <Popper
            placement="bottom-start"
            open={popperSets.popper}
            disablePortal={false}
            anchorEl={popperSets.arrowRef}
            modifiers={{
              flip: { enabled: true },
              preventOverflow: {
                enabled: true,
                boundariesElement: 'scrollParent',
              },
            }}
          >
            <PriorityList savePriority={savePriority} />
          </Popper>
        </form>


      </ClickAwayListener>

    </>


  );
}

const mapDispatch = { createTodo };

export default connect(null, mapDispatch)(InsertTodo);
