import type { ReactElement } from 'react';
import Banner from './banner.js';
import type { ApplicationProps } from '../core/application-props.js';
import ContentInfo from './content-info.js';
import classes from './application.module.scss';
import Heading from './heading.jsx';
import useApplication from '../core/use-application.js';

/**
 * An application is a structure containing one or more focusable elements
 * requiring user input, such as keyboard or gesture events, that do not follow
 * a standard interaction pattern supported by a widget role.
 * Some user agents and assistive technologies have a browse mode where
 * standard input events, such as up and down arrow key events, are intercepted
 * and used to control a reading cursor. This browse mode behavior prevents
 * elements that do not have a widget role from receiving and using such
 * keyboard and gesture events to provide interactive functionality.
 * Use an application when you need to create a component with an interaction
 * model that is not supported by any of the other components. When a user
 * navigates into an application, assistive technologies that intercept standard
 * input events _should_ switch to a mode that passes most or all standard input
 * events through to the web application.
 * For example, a presentation slide editor uses arrow keys to change the
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
  heading,
  label,
  labelledBy: labelledByProp,
  roleDescription,
}: ApplicationProps): ReactElement {
  const { headingId, labelledBy } = useApplication({
    labelledBy: labelledByProp,
  });

  return (
    <div
      aria-describedby={describedBy}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-roledescription={roleDescription}
      className={classes['application']}
      role="application"
    >
      {banner !== undefined && <Banner>{banner}</Banner>}
      <Heading id={headingId}>{heading}</Heading>
      {children}
      {contentInfo !== undefined && <ContentInfo>{contentInfo}</ContentInfo>}
    </div>
  );
}
