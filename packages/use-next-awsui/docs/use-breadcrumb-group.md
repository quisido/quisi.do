# `useBreadcrumbGroup`

`useBreadcrumbGroup` is a React hook for managing `BreadcrumbGroup`'s state with
React Router.

## Table of Contents

- [State](#state)
  - [`handleFollow`](#handlefollow)
- [Examples](#examples)

## State

### `handleFollow`

`BreadcrumbGroup`'s `onFollow` prop

## Examples

```jsx
import BreadcrumbGroup from '@awsui/components-react/breadcrumb-group';
import { useBreadcrumbGroup } from 'use-next-awsui';

const ITEMS = [
  // ...
];

export default function MyBreadcrumbGroup() {
  const { handleFollow } = useBreadcrumbGroup();

  return <BreadcrumbGroup items={ITEMS} onFollow={handleFollow} />;
}
```
