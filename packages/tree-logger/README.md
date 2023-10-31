# Tree Logger

The tree logger is a styled, hierarchical logger.

```js
const treeLogger = new TreeLogger('Parent');
treeLogger.scope('Child 1', () => {
  treeLogger.addItem('Looks good');
});
treeLogger.scope('Child 2', () => {
  treeLogger.addError('Looks bad');
});
```

```
Parent
├─ Child 1
│   └─ Looks good
└─ Child 2
    └─ ⚠ Looks bad ⚠
```

## Install

```sh
yarn add --dev "@monorepo-template/tree-logger"
```
