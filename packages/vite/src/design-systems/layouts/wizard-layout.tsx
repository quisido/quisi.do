import type { ReactElement } from 'react';
import type { WizardLayoutProps } from '../shared/wizard-layout-props.js';
import Form from '../template/form.js';
import Group from '../template/group.js';
import Main from '../template/main.js';
import ProgressBar from '../template/progress-bar.js';

/**
 *   The `WizardLayout` is a multi-step form that focuses the user on one task
 * at a time. It includes a progress indicator to communicate how far the user
 * has advanced through the workflow.
 *   Each step is presented as a group within a form landmark, ensuring
 * assistive technologies can communicate the form's purpose and the user's
 * current position.
 * @see {@link https://www.w3.org/WAI/tutorials/forms/multi-page/ | WAI multi-page forms}
 */
export default function WizardLayout({
  children,
  currentStep,
  label,
  totalSteps,
}: WizardLayoutProps): ReactElement {
  return (
    <Main label={label}>
      <Form label={label}>
        <ProgressBar
          label={`Step ${String(currentStep)} of ${String(totalSteps)}`}
          max={totalSteps}
          value={currentStep}
        />
        <Group label={`Step ${String(currentStep)}`}>{children}</Group>
      </Form>
    </Main>
  );
}
