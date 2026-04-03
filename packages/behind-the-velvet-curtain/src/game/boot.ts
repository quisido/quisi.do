import monogatari from '@monogatari/core';
import { CHARACTERS } from './characters.js';
import { SCENES } from './scenes.js';
import { SCRIPT } from './script.js';
import { SETTINGS } from './settings.js';
import { MONOGATARI_SHELL_HTML } from './shell.js';
import { DEFAULT_STORAGE } from './storage.js';
import { registerServiceWorker } from '../pwa/register-service-worker.js';

let configured = false;
let bootPromise: Promise<typeof monogatari> | null = null;

const ensureGameShell = (selector: string): void => {
  const root = document.querySelector(selector);

  if (root instanceof HTMLElement && root.innerHTML.trim() === '') {
    root.innerHTML = MONOGATARI_SHELL_HTML;
  }
};

export const configureGame = (): typeof monogatari => {
  if (configured) {
    return monogatari;
  }

  monogatari.settings(SETTINGS);
  monogatari.storage(DEFAULT_STORAGE);
  monogatari.characters(CHARACTERS);
  monogatari.assets('scenes', SCENES);
  monogatari.script(SCRIPT);

  configured = true;

  return monogatari;
};

export const bootGame = (
  selector = '#monogatari',
): Promise<typeof monogatari> => {
  if (bootPromise !== null) {
    return bootPromise;
  }

  ensureGameShell(selector);

  const engine = configureGame();

  bootPromise = engine
    .init(selector)
    .then(async (): Promise<typeof monogatari> => {
      await registerServiceWorker();
      return engine;
    });

  return bootPromise;
};
