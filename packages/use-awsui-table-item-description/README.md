# `useAwsuiTableItemDescription`

[![version](https://img.shields.io/npm/v/use-awsui-table-item-description.svg)](https://www.npmjs.com/package/use-awsui-table-item-description)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/use-awsui-table-item-description.svg)](https://www.npmjs.com/package/use-awsui-table-item-description)
[![downloads](https://img.shields.io/npm/dt/use-awsui-table-item-description.svg)](https://www.npmjs.com/package/use-awsui-table-item-description)

`useAwsuiTableItemDescription` allows you to mount a full-width item description
to each row in your AWS UI table.

In the following screenshot, the package name (`use-force-update`) and total
download count (2.6m) are column definitions of the table. The description is
a React component mounted with the `useAwsuiTableItemDescription` hook.

![screenshot](https://user-images.githubusercontent.com/343837/111864587-1d177480-891f-11eb-90a4-fb59209cb732.png)

## Install

- `npm install use-awsui-table-item-description` or
- `yarn add use-awsui-table-item-description`

## Use

```javascript
import Table from '@awsui/components-react/table';
import { useRef } from 'react';
import useAwsuiTableItemDescription from 'use-awsui-table-item-description';

const COLUMN_DEFINITIONS = [ /* ... */ ];

const ITEM = {
  description: 'This is my description.',
};

function TableItemDescription(item) {
  return <>{item.description}</>;
}

function MyTable() {
  const ref = useRef(null);
  const DescriptionPortal = useAwsuiTableItemDescription({
    Component: TableItemDescription,
    colSpan: 4,
    items: ITEMS,
    ref,
  });

  return (
    <div ref={ref}>
      <Table columnDefinitions={COLUMN_DEFINITIONS} items={[ITEM]} />
      <DescriptionPortal />
    </div>
  );
```

## API

### `Component`

Type: `ComponentType<Item> | undefined` _optional_

The `Component` property specifies the React component that you want to mount
inside the description cell. Like the `cell` property of column definitions, it
will receive the item instance spread as its props.

If no component is provided, the descripition row will not be mounted.

### `colSpan`

Type: `number` _required_

The `colSpan` property specifies the column span of the description cell. It is
recommended you set this to the number of visible columns. If you do not have
access to the number of visible columns, you should be safe simply setting this
to a sufficiently large number like `99`.

### `items`

Type: `Item[]` _required_

The `items` property specifies the currently visible items in the table. This
value is likely equal to the value you pass to `<Table />` as its `items` prop.

The hook uses these `items` to pass to the description component.

### `onRowClick`

Type: `TableProps['onRowClick']` _optional_

The `onRowClick` property specifies a callback to execute when the description
row is clicked. The format of this callback is equivalent to the `<Table />`
component's `onRowClick` prop.

### `ref`

Type: `MutableRefObject<HTMLElement | null>` _required_

The `ref` property is a `useRef(null)` instance that must be passed to an HTML
element that wraps the `<Table />` component.

The hook uses this ref to navigate and mutate its child DOM nodes.
