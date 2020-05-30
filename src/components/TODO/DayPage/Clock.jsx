import React, { useRef, useEffect } from 'react';
import { SVG } from '@svgdotjs/svg.js';

const timers = [{ start: '00:30', end: '3:30' }, { start: '11:00' }, {}];

function toMinutes(time) {
  return +time.split(':')[0] * 60 + +time.split(':')[1];
}


export default function Clock() {
  const svgDiv = useRef();


  function drawClockSvg() {
    const { width } = svgDiv.current.getBoundingClientRect();
    const raio = (width - 200) / 2;
    const draw = SVG().addTo(svgDiv.current).size(width, width);

    draw.circle(raio * 2).fill('#C4C4C4').center(width / 2, width / 2); // Clock

    function drawTask({ start, end }, color) {
      let startCenter;
      let endCenter;

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
    drawTask(timers[0], 'black');
    drawTask(timers[1], 'blue');
    drawTask(timers[2], 'white');
  }

  useEffect(() => {
    drawClockSvg();
  }, []);


  return (
    <div style={{ width: 1000 }} ref={svgDiv} />
  );
}
