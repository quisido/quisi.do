import testDesignSystem from './core-test/index.js';
const module = await import('./memphis-lite/index.js');
testDesignSystem(module);
