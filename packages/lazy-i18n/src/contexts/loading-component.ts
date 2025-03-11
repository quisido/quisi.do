import { createContext, type ComponentType } from 'react';
import Loading from '../components/loading/index.js';

export default createContext<ComponentType<unknown>>(Loading);
