import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';
import noop from '../utils/noop';

const DarkModeContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([true, noop]);

export default DarkModeContext;
