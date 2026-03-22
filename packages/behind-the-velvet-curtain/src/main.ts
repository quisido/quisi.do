import '@monogatari/core/dist/engine/core/monogatari.css';
import './styles/index.css';
import { bootGame } from './game/boot.js';

void bootGame().catch((error: unknown): void => {
  window.console.error('Failed to bootstrap Behind the Velvet Curtain.', error);
});
