import ListItem from '@mui/material/ListItem';
import type { ReactElement } from 'react';
import type NavigationCategory from './types/navigation-category';
import type NavigationComponent from './types/navigation-component';
import type NavigationExternalLink from './types/navigation-external-link';
import type NavigationLink from './types/navigation-link';
import filterByNavigationCategory from './utils/filter-by-navigation-category';
import filterByNavigationComponent from './utils/filter-by-navigation-component';
import filterByNavigationExternalLink from './utils/filter-by-navigation-external-link';
import CategoryItem from './wrapper.mui-navigation-category-item.view';
import ExternalLinkItem from './wrapper.mui-navigation-external-link-item.view';
import LinkItem from './wrapper.mui-navigation-link-item.view';

interface Props {
  readonly children:
    | NavigationCategory
    | NavigationComponent
    | NavigationExternalLink
    | NavigationLink;
  readonly depth?: number | undefined;
}

const DEFAULT_DEPTH = 1;
const DEPTH_OFFSET = 1;

export default function WrapperMuiNavigationItem({
  children: item,
  depth = DEFAULT_DEPTH,
}: Readonly<Props>): ReactElement {
  // Navigation category
  if (filterByNavigationCategory(item)) {
    const { children, defaultExpanded, text } = item;
    return (
      <CategoryItem defaultExpanded={defaultExpanded} depth={depth} text={text}>
        {children.map(
          (
            childItem:
              | NavigationCategory
              | NavigationComponent
              | NavigationExternalLink
              | NavigationLink,
            index: number,
          ) => (
            <WrapperMuiNavigationItem depth={depth + DEPTH_OFFSET} key={index}>
              {childItem}
            </WrapperMuiNavigationItem>
          ),
        )}
      </CategoryItem>
    );
  }

  // Navigation component
  if (filterByNavigationComponent(item)) {
    const { Component } = item;
    return (
      <ListItem>
        <Component />
      </ListItem>
    );
  }

  if (filterByNavigationExternalLink(item)) {
    const { text, url } = item;
    return <ExternalLinkItem depth={depth} text={text} url={url} />;
  }

  const { path, text } = item;
  return <LinkItem depth={depth} path={path} text={text} />;
}
