import { red, yellow, green } from '@material-ui/core/colors';

const priorities = (shade = 800) => [
  { color: red[shade] },
  { color: yellow[shade] }, { color: green[shade] }, { color: 'rgba(255,255,255,0.3)' },
];


export default priorities;
