# `useTabs`

`useTabs` is a React hook for managing `Tabs`'s state with React Router.

## Table of Contents

- [Props](#props)
  - [`defaultActiveTabId`](#defaultactivetabid)
  - [`tabs`](#tabs)
- [State](#state)
  - [`activeTabId`](#activetabid)
  - [`handleChange`](#handlechange)
  - [`ref`](#ref)
- [Examples](#examples)

## Props

### `defaultActiveTabId`

Type: `string` _optional_

The default value of `Tabs`'s `activeTabId` prop

If [`tabs`](#tabs) is provided, any tabs matching the current route will take
priority. The `defaultActiveTabId` is useful for defining which tab to display
when _no_ `tabs` match the current route.

### `tabs`

Type: `TabsProps.Tab[]` _optional_

The `tabs` prop of `useTabs` is the same value you would pass as the `tabs` prop
of the `Tabs` component. The `useTabs` hook will scan this array for any tabs
that match the current route and use this to generate `Tabs`'s `activeTabId`
prop.

## State

### `activeTabId`

`Tabs`'s `activeTabId` prop

### `handleChange`

`Tabs`'s `onChange` prop

### `ref`

`Tabs`'s `ref` prop

By passing this `ref` prop to your `Tabs` component, each tab will
_scroll into view_ when it mounts.

Example customer behavior:

- Customer selects your first tab, navigating to the `/tab1` route.
- Customer scrolls to bottom of the page as they read the contents of the first
  tab.
- Customer selects the route corresponding to your second tab, `/tab2`, from
  your
  [`SideNavigation` component](https://github.com/CharlesStover/use-awsui-router/blob/master/docs/use-side-navigation.md)
  without first scrolling back to the top of the page.
- Since the navigation matches a new tab, your `activeTabId` of your `Tabs`
  component updates.
- Your `Tabs` component now renders your second tab.
- If the `ref` state value is passed as a prop to your `Tabs` component, the
  customer's page will scroll back to the top of the `Tabs` component.
- If the `ref` state value is _not_ passed as a prop to your `Tabs` component,
  the customer's page will remain scrolled to the bottom, where they had
  manually scrolled it.

## Examples

```jsx
import Tabs from '@awsui/components-react/tabs';
import { useTabs } from 'use-next-awsui';

const TABS = [
  // ...
];

export default function MyAlert() {
  const { activeTabId, handleChange, ref } = useAlert({
    defaultActiveTabId: 'my-tab',
    tabs: TABS,
  });

  return (
    <Tabs
      activeTabId={activeTabId}
      onChange={handleChange}
      ref={ref}
      tabs={TABS}
    />
  );
}
```
