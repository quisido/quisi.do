import type BrowserGame from './browser-game.js';

export default function addEventListeners<State>(
  window: Window,
  game: BrowserGame<State>,
): void {
  window.addEventListener('keydown', (event: KeyboardEvent): void => {
    game.dispatch({ payload: event, type: 'keydown' });
  });

  window.addEventListener('keypress', (event: KeyboardEvent): void => {
    game.dispatch({ payload: event, type: 'keypress' });
  });

  window.addEventListener('keyup', (event: KeyboardEvent): void => {
    game.dispatch({ payload: event, type: 'keyup' });
  });
}
