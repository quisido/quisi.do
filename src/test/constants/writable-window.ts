import createWritableWindow from '../utils/create-writable-window';

const WRITABLE_WINDOW: Window & typeof globalThis = createWritableWindow();

export default WRITABLE_WINDOW;
