import character from './character.js';
import type GameObject from './game-object.js';
import Game from './game.js';

const game = new Game({
  objects: {},
  seed: 1,
  timestamp: Date.now(),

  game(this: GameObject): void {
    this.addChild('main', character, { name: 'Ace', type: 'hero' });
  },
});

const INTERVAL = 10_000;
window.setInterval((): void => {
  window.console.log(game.toJSON());
}, INTERVAL);
