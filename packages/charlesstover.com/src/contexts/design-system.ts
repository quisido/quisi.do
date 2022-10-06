import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';
import DesignSystem from '../constants/design-system';
import noop from '../utils/noop';

const DesignSystemContext = createContext<
  [DesignSystem, Dispatch<SetStateAction<DesignSystem>>]
>([DesignSystem.Aws, noop]);

export default DesignSystemContext;
