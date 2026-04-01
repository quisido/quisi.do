import type { ReactElement } from 'react';
import OwnsBanner from '../shared/owns-banner.js';
import Banner from './banner.js';
import type { ApplicationProps } from '../shared/application-props.js';
import OwnsContentInfo from '../shared/owns-content-info.js';
import ContentInfo from './content-info.js';

/**
 *   An `Application` is a structure containing one or more focusable elements
 * requiring user input, such as keyboard or gesture events, that do not follow
 * a standard interaction pattern supported by a widget role.
 *   Some user agents and assistive technologies have a browse mode where
 * standard input events, such as up and down arrow key events, are intercepted
 * and used to control a reading cursor. This browse mode behavior prevents
 * elements that do not have a widget role from receiving and using such
 * keyboard and gesture events to provide interactive functionality.
 *   Use an application when you need to create a component with an interaction
 * model that is not supported by any of the other components. When a user
 * navigates into an application, assistive technologies that intercept standard
 * input events _should_ switch to a mode that passes most or all standard input
 * events through to the web application.
 *   For example, a presentation slide editor uses arrow keys to change the
 * positions of textbox and image elements on the slide. There are not any
 * components that correspond to such an interaction model so the slide is
 * contained with an application with the role description "Slide Editor", and
 * described by its provided instructions.
 * @see {@link https://w3c.github.io/aria/#application | WAI-ARIA `application` role}
 */
export default function Application({
  banner,
  children,
  contentInfo,
  describedBy,
  label,
  roleDescription,
}: ApplicationProps): ReactElement {
  return (
    <div
      aria-describedby={describedBy}
      aria-label={label}
      aria-roledescription={roleDescription}
      role="application"
    >
      <OwnsBanner>
        <OwnsContentInfo>
          {banner !== undefined && <Banner>{banner}</Banner>}
          {children}
          {contentInfo !== undefined && (
            <ContentInfo>{contentInfo}</ContentInfo>
          )}
        </OwnsContentInfo>
      </OwnsBanner>
    </div>
  );
}
