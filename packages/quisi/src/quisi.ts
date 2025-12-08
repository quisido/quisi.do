#!/usr/bin/env node
import Quisi from './features/quisi.js';

const QUISI = new Quisi({
  cwd: process.cwd(),
  onBeforeExit(callback: () => Promise<void>): void {
    process.on('beforeExit', (): void => {
      void callback();
    });
  },
  platform: process.platform,
});

const config = await QUISI.loadConfig();

console.log('Config loaded:', config);
