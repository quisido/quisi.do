import type { ReactElement } from 'react';
import type { LandingLayoutProps } from '../shared/landing-layout-props.js';
import Main from '../template/main.js';
import Region from '../template/region.js';

/**
 *   The `LandingLayout` is a modern page design featuring a large hero section
 * at the top, followed by feature content blocks in an alternating layout, and
 * an optional call-to-action section at the bottom.
 *   This layout is typically used for marketing pages, product introductions,
 * and splash pages with large imagery and promotional content.
 */
export default function LandingLayout({
  callToAction,
  children,
  hero,
  label,
}: LandingLayoutProps): ReactElement {
  return (
    <Main label={label}>
      <Region label="Hero">{hero}</Region>
      {children}
      {callToAction !== undefined && (
        <Region label="Call to action">{callToAction}</Region>
      )}
    </Main>
  );
}
