import type { ReactElement, ReactNode } from 'react';

interface BaseToolbarProps {
  readonly children: ReactNode;
  /**
   * @default 'horizontal'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
}

export interface LabelToolbarProps extends BaseToolbarProps {
  readonly label: string;
  readonly labelledBy?: undefined;
}

export interface LabelledByToolbarProps extends BaseToolbarProps {
  readonly label?: undefined;
  readonly labelledBy: string;
}

export type ToolbarProps = LabelToolbarProps | LabelledByToolbarProps;

/**
 *   The `Toolbar` component is a collection of commonly used controls, such as
 * buttons or checkboxes, grouped together in a compact visual form. Only use a
 * `Toolbar` component to group 3 or more controls.
 */
export default function Toolbar({
  children,
  label,
  labelledBy,
  orientation = 'horizontal',
}: ToolbarProps): ReactElement {
  /**
   * Technical debt: Implement keyboard navigation for toolbars.
   * Acceptance criteria:
   * - Tab and Shift + Tab: Move focus into and out of the toolbar. When focus
   *   moves into a toolbar:
   *   - If focus is moving into the toolbar for the first time, focus is set on
   *     the first control that is not disabled.
   *   - If the toolbar has previously contained focus, focus is optionally set
   *     on the control that last had focus. Otherwise, it is set on the first
   *     control that is not disabled.
   * - For a horizontal toolbar (the default):
   *   - Left Arrow: Moves focus to the previous control. Optionally, focus
   *     movement may wrap from the first element to the last element.
   *   - Right Arrow: Moves focus to the next control. Optionally, focus
   *     movement may wrap from the last element to the first element.
   * - For a vertical toolbar:
   *   - Down Arrow: Performs as Right Arrow is described above.
   *   - Up Arrow: Performs as Left Arrow is described above.
   * - Home (Optional): Moves focus to first element.
   * - End (Optional): Moves focus to last element.
   */
  return (
    <div
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-orientation={orientation}
      role="toolbar"
    >
      {children}
    </div>
  );
}
