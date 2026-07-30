/// <reference types="bun-types" />
import GameEngine from './index.js';
import { describe, expect, it } from 'bun:test';

class TestGameEngine extends GameEngine {
  public constructor() {
    super({
      now: Date.now.bind(Date),
      version: 1,
    });
  }
}

describe('Game Engine', (): void => {
  it('should support versioning', (): void => {
    const engine = new TestGameEngine();
    expect(engine.version).toBe(1);
  });
});
