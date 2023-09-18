# `useSideNavigation`

`useSideNavigation` is a React hook for managing `SideNavigation`'s state with
React Router.

## Table of Contents

- [State](#state)
  - [`activeHref`](#activehref)
  - [`handleFollow`](#handlefollow)
- [Examples](#examples)

## State

### `activeHref`

`SideNavigation`'s `activeHref` prop

### `handleFollow`

`SideNavigation`'s `onFollow` prop

## Examples

```jsx
import SideNavigation from '@awsui/components-react/side-navigation';
import { useSideNavigation } from 'use-next-awsui';

const ITEMS = [
  // ...
];

export default function MySideNavigation() {
  const { activeHref, handleFollow } = useSideNavigation();

  return (
    <SideNavigation
      activeHref={activeHref}
      items={ITEMS}
      onFollow={handleFollow}
    />
  );
}
```
