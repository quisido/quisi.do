# `useLink`

`useLink` is a React hook for managing `Link`'s state with React Router.

## Table of Contents

- [State](#state)
  - [`handleFollow`](#handlefollow)
- [Examples](#examples)

## State

### `handleFollow`

`Link`'s `onFollow` prop

## Examples

```jsx
import Link from '@awsui/components-react/link';
import { useLink } from 'use-next-awsui';

export default function MyLink() {
  const { handleFollow } = useLink();

  return (
    <Link href="/my-href" onFollow={handleFollow}>
      my link
    </Link>
  );
}
```
