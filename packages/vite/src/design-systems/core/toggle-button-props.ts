import type { ReactNode } from 'react';

export interface ToggleButtonProps {
  readonly children: ReactNode;
  /** @default false */
  readonly disabled?: boolean | undefined;
  readonly onPress: VoidFunction;
  readonly onUnpress: VoidFunction;
  readonly pressed: boolean;
}
