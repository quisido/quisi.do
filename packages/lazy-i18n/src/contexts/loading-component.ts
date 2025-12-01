import { type ComponentType, type Context, createContext } from 'react';
import Loading from '../components/loading/index.js';

const LoadingComponent: Context<ComponentType<unknown>> =
  createContext<ComponentType<unknown>>(Loading);

export default LoadingComponent;
