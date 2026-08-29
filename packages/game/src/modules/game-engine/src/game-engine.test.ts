/// <reference types="bun-types" />
import { describe, expect, it } from 'bun:test';
import GameEngine from './game-engine.js';

describe('Game Engine', (): void => {
  it('should support versioning', (): void => {
    expect(GameEngine.VERSION).toBe(1);
  });
});
