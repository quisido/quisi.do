import BrowserGame from "../modules/browser-game/src/index.js";
import World from "./features/world.js";

const canvas: HTMLCanvasElement | undefined =
  window.document.getElementsByTagName('canvas')[0];
if (canvas === undefined) {
  throw new Error('Expected a canvas.');
}

const game = new BrowserGame({
  canvas,
  initialState: {},
  world: World,
});

window.addEventListener('beforeunload', (): void => {
  JSON.stringify(game.state);
}, {
  passive: true,
});
