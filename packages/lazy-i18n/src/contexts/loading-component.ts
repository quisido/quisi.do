import { ComponentType, createContext } from 'react';
import Loading from '../components/loading';

export default createContext<ComponentType<unknown>>(Loading);
