import { type ComponentType, createContext } from 'react';
import Loading from '../components/loading/index.js';

export default createContext<ComponentType<unknown>>(Loading);
