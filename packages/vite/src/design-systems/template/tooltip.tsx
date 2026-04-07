import type { ReactElement } from 'react';
import useTooltip from '../core/use-tooltip.js';
import type { TooltipProps } from '../core/tooltip-props.js';

/**
 *   A `Tooltip` component provides contextual information about an element when
 * that owning element receives focus or is hovered over, but is otherwise not
 * visible on the page. The tooltip is displayed automatically, after a brief
 * delay; the user does not request it. While a tooltip can be placed on any
 * content, they generally are tips for tools or controls, such as providing
 * additional content for icons that have brief labels.
 *   A tooltip typically becomes visible, after a short delay of generally one
 * to five seconds, in response to a mouse hover, or after the owning element
 * receives keyboard focus. Just as it is opened automatically, without user
 * request, it is closed automatically when the focus is lost or on mouse out.
 * It must stay open when the mouse moves over the tooltip itself, and should
 * also close when the user presses the Escape key.
 *   Because the tooltip itself never receives focus and is not in the tabbing
 * order, a tooltip can not contain interactive elements like links, inputs, or
 * buttons.
 *   The tooltip is not the appropriate role for the more information "i" icon,
 * ⓘ. A tooltip is directly associated with the owning element. The ⓘ isn't
 * 'described by' detailed information; the tool or control is.
 */
export default function Tooltip({
  children,
  htmlFor,
}: TooltipProps): ReactElement {
  const id: string = useTooltip(htmlFor);

  return (
    <span id={id} role="tooltip">
      {children}
    </span>
  );
}
