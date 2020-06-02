import React, { useRef, useEffect, useState } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import { connect } from 'react-redux';
import moment from 'moment';

const timers = [{ start: '00:30', end: '3:30' }, { start: '11:00' }, {}];

function toMinutes(time) {
  return +time.split(':')[0] * 60 + +time.split(':')[1];
}


function Clock({ TODOS: todos, father }) {
  const svgDiv = useRef();
  const initialMont = useRef(true);
  const [widthState, setWidthState] = useState(0);
  const [draw, setDraw] = useState(SVG());

  function drawTask({ start, end }, color, width = widthState) {
    let startCenter;
    let endCenter;
    console.log('rodou');
    console.log(width);
    const raio = (width - 50) / 2;

    if (start) {
      const startMinutes = toMinutes(start);
      startCenter = [
        width / 2 + raio * Math.sin((Math.PI * startMinutes) / 360),
        width / 2 - raio * Math.cos((Math.PI * startMinutes) / 360)];
      draw.circle(30).fill(color).center(...startCenter);
    }


    if (end) {
      const endMinutes = toMinutes(end);
      endCenter = [
        width / 2 + raio * Math.sin((Math.PI * endMinutes) / 360),
        width / 2 - raio * Math.cos((Math.PI * endMinutes) / 360)];

      draw.path(`M ${startCenter[0]} ${startCenter[1]}
    A ${raio} ${raio} 0 0 1 ${endCenter[0]} ${endCenter[1]}`).stroke({ color, width: 10 }).attr('fill-opacity', 0);

      draw.circle(30).fill(color).center(...endCenter);
    }
  }


  function drawClockSvg() {
    const { width } = svgDiv.current.getBoundingClientRect();
    setWidthState(width);
    const raio = (width - 50) / 2;
    draw.addTo(svgDiv.current).size(width, width);
    // await setDrawer(draw);
    draw.circle(raio * 2).fill('#C4C4C4').center(width / 2, width / 2); // Clock


    // const todosToRender = todos.filter((todo) => moment(todo.date.start, 'L').isSame(moment(), 'day'));
    // todosToRender.forEach(({ startTime, endTime }) => drawTask({ start: startTime, end: endTime }, 'blue'));

    // drawTask(timers[0], 'black', width);
    drawTask(timers[1], 'blue', width);
    // drawTask(timers[2], 'white');
  }

  useEffect(() => {
    drawClockSvg();
  }, []);

  useEffect(() => {
    if (initialMont.current) {
      initialMont.current = false;
    } else {
      const newTodo = todos[todos.length - 1];

      if (moment(newTodo.date.start, 'L').isSame(moment(), 'day')) {
        drawTask({ start: newTodo.date.startTime, end: newTodo.date.endTime }, 'black');
      }
    }
  }, [todos]);


  return (
    <div style={{ width: '70%', margin: 'auto', paddingTop: 30 }} ref={svgDiv} />
  );
}

function mapState(state) {
  return ({ TODOS: state.TODOS });
}


export default connect(mapState)(Clock);
