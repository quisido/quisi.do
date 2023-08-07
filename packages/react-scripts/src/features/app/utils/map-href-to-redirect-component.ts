import type { ComponentType } from 'react';

export default function mapHrefToRedirectComponent(
  href: string,
): ComponentType<unknown> {
  return function Redirect(): null {
    window.location.href = href;
    return null;
  };
}
