import ListItem from '@mui/material/ListItem';
import { type ReactElement } from 'react';
import type Category from '../../../../../../types/navigation-category';
import type Component from '../../../../../../types/navigation-component';
import type ExternalLink from '../../../../../../types/navigation-external-link';
import type Link from '../../../../../../types/navigation-link';
import filterNavigationByCategory from '../../../../../../utils/filter-navigation-by-category';
import filterNavigationByComponent from '../../../../../../utils/filter-navigation-by-component';
import filterNavigationByExternalLink from '../../../../../../utils/filter-navigation-by-external-link';
import CategoryItem from '../navigation-category-item';
import ExternalLinkItem from '../navigation-external-link-item';
import LinkItem from '../navigation-link-item';

interface Props {
  readonly children: Category | Component | ExternalLink | Link;
  readonly depth?: number | undefined;
}

const DEFAULT_DEPTH = 1;
const DEPTH_OFFSET = 1;

export default function WrapperMuiNavigationItem({
  children: item,
  depth = DEFAULT_DEPTH,
}: Props): ReactElement {
  // Navigation category
  if (filterNavigationByCategory(item)) {
    const { children, defaultExpanded, text } = item;

    const mapChildToComponent = (
      childItem: Category | Component | ExternalLink | Link,
    ): ReactElement => (
      <WrapperMuiNavigationItem
        depth={depth + DEPTH_OFFSET}
        key={childItem.text}
      >
        {childItem}
      </WrapperMuiNavigationItem>
    );

    return (
      <CategoryItem defaultExpanded={defaultExpanded} depth={depth} text={text}>
        {children.map(mapChildToComponent)}
      </CategoryItem>
    );
  }

  // Navigation component
  if (filterNavigationByComponent(item)) {
    const { Component } = item;
    return (
      <ListItem>
        <Component />
      </ListItem>
    );
  }

  // External link
  if (filterNavigationByExternalLink(item)) {
    const { text, url } = item;
    return <ExternalLinkItem depth={depth} text={text} url={url} />;
  }

  const { path, text } = item;
  return <LinkItem depth={depth} path={path} text={text} />;
}
