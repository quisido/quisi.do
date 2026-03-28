import type { ReactNode } from 'react';

export interface WizardLayoutProps {
  /** Content for the current step. */
  readonly children: ReactNode;
  /** The 1-based index of the current step. */
  readonly currentStep: number;
  /** Accessible label for the form. */
  readonly label: string;
  /** The total number of steps in the wizard. */
  readonly totalSteps: number;
}
