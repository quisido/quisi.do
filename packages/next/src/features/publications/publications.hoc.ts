import { lazy } from 'react';
import withWrapper from '../../hocs/with-wrapper';
import useWrapperProps from './hooks/use-wrapper-props';

export default withWrapper(
  lazy(async () => import('./publications.view')),
  useWrapperProps,
);
