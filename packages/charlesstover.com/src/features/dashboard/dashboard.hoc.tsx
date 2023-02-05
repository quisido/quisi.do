import type { ComponentType } from 'react';
import { lazy } from 'react';
import withWrapper from '../../hocs/with-wrapper';
import useWrapperProps from './hooks/use-wrapper-props';
import type { Props } from './dashboard.view';

const Dashboard: ComponentType<Props> = lazy(
  async (): Promise<Record<'default', ComponentType<Props>>> =>
    import('./dashboard.view'),
);

export default withWrapper(Dashboard, useWrapperProps);
