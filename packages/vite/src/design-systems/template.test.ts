import testDesignSystem from './core-test/index.js';

const module = await import('./template/index.js');

testDesignSystem(module);
