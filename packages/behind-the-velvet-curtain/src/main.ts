import '@monogatari/core/dist/engine/core/monogatari.css';
import './styles/index.css';
import { bootGame } from './game/boot.js';

try {
  await bootGame();
} catch (error: unknown) {
  window.console.error('Failed to bootstrap Behind the Velvet Curtain.', error);
}
