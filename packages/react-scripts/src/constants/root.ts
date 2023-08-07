import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import getContainer from '../utils/get-container';

const CONTAINER: HTMLElement = getContainer();

const ROOT: Root = createRoot(CONTAINER);

export default ROOT;
