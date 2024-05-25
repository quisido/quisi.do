import getState from '../utils/get-state.js';

export default function getConsole(): Console {
  const { console } = getState();
  return console;
}
