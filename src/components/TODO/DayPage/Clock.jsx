import React, { useRef, useEffect, useState } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import { connect } from 'react-redux';
import moment from 'moment';
import { Typography } from '@material-ui/core';

function toMinutes(time, type) {
  if (type === 'AM') {
    return +time.split(':')[0] * 60 + +time.split(':')[1];
  }

  return (+time.split(':')[0] - 12) * 60 + +time.split(':')[1];
}

function filterTodos(todos, day) {
  // function filter(todo) {
  //   if (type === 'AM') {
  //     return moment(todo.date.startTime, 'HH:mm').isBefore(moment().hour(12).minutes(0));
  //   }
  //   return moment(todo.date.startTime, 'HH:mm').isAfter(moment().hour(12).minutes(0));
  // }


  // return todos
  //   .filter((todo) => (moment(todo.date.start, 'L').isSame(moment(), 'day')))
  //   .filter(filter);
  if (day === 'Hoje') { return todos.filter((todo) => (moment(todo.date.start, 'L').isSame(moment(), 'day'))); }
  if (day === 'Amanhã') { return todos.filter((todo) => (moment(todo.date.start, 'L').isSame(moment().add(1, 'day'), 'day'))); }
}

function classifiesTodos(todos, day) {
  let type;
  const todayTodos = filterTodos(todos, day);

  return todayTodos.map((todo) => {
    if (moment(todo.date.startTime, 'HH:mm').isBefore(moment().hour(12).minutes(0))) {
      type = 'AM';
    } else { type = 'PM'; }

    return { todo, type };
  });
}

function deleteTodos() {
  const tasks = document.querySelectorAll('.task-circle');
  if (tasks.length) { for (let i = tasks.length - 1; i !== -1; i -= 1) { tasks[i].remove(); } }
}

// TODO: Melhorar a performance, não precisa sempre deletrar todos

function Clock({ TODOS, type, day }) {
  const svgDiv = useRef();
  const initialMont = useRef(true);
  const [widthState, setWidthState] = useState(0);
  const [draw] = useState(SVG());
  const [todos, setTodos] = useState(classifiesTodos(TODOS, day));

  function drawTask({ startTime: start, endTime: end }, color, width = widthState) {
    let startCenter;
    let endCenter;

    const raio = (width - 50) / 2;

    if (start) {
      const startMinutes = toMinutes(start, type);
      startCenter = [
        width / 2 + raio * Math.sin((Math.PI * startMinutes) / 360),
        width / 2 - raio * Math.cos((Math.PI * startMinutes) / 360)];
      draw.circle(30).fill(color).center(...startCenter).attr('class', 'task-circle');
    }


    if (end) {
      const endMinutes = toMinutes(end, type);
      endCenter = [
        width / 2 + raio * Math.sin((Math.PI * endMinutes) / 360),
        width / 2 - raio * Math.cos((Math.PI * endMinutes) / 360)];

      draw.path(`M ${startCenter[0]} ${startCenter[1]}
    A ${raio} ${raio} 0 0 1 ${endCenter[0]} ${endCenter[1]}`).stroke({ color, width: 10 }).attr('fill-opacity', 0).attr('class', 'task-circle');

      draw.circle(30).fill(color).center(...endCenter).attr('class', 'task-circle');
    }
  }


  function drawClockSvg() {
    const { width } = svgDiv.current.getBoundingClientRect();
    setWidthState(width);
    const raio = (width - 50) / 2;
    draw.addTo(svgDiv.current).size(width, width);
    draw.circle(raio * 2).fill('#C4C4C4').center(width / 2, width / 2); // Clock
    todos
      .filter((todo) => todo.type === type)
      .forEach(({ todo }) => drawTask({ startTime: todo.date.startTime, endTime: todo.date.endTime }, 'black', width));
  }

  useEffect(() => {
    drawClockSvg();
  }, []);

  useEffect(() => {
    setTodos(classifiesTodos(TODOS, day));
    deleteTodos();
  }, [TODOS, type]);

  useEffect(() => {
    if (initialMont.current) {
      initialMont.current = false;
    } else if (todos.length) {
      todos
        .filter((todo) => todo.type === type)
        .forEach(({ todo }) => drawTask({ startTime: todo.date.startTime, endTime: todo.date.endTime }, 'black'));
    }
  }, [todos]);


  return (
    <div style={{ width: '70%', margin: 'auto', paddingTop: 30 }} ref={svgDiv}>
      <Typography>{type}</Typography>
    </div>
  );
}

function mapState(state) {
  return ({ TODOS: state.TODOS });
}


export default connect(mapState)(Clock);
