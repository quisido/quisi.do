import Box from '@awsui/components-react/box';
import SideNavigation, {
  SideNavigationProps,
} from '@awsui/components-react/side-navigation';
import { ReactElement } from 'react';
import useReactRouterSideNavigation from '../../hooks/use-react-router-side-navigation';

const ITEMS: SideNavigationProps.Item[] = [
  {
    href: '/',
    type: 'link',
    text: 'Home',
  },
  {
    defaultExpanded: true,
    items: [
      {
        href: '/packages',
        type: 'link',
        text: 'Packages',
      },
      {
        href: '/publications',
        type: 'link',
        text: 'Publications',
      },
      {
        href: '/quotes',
        type: 'link',
        text: 'Quotes',
      },
    ],
    text: 'Portfolio',
    type: 'section',
  },
  {
    defaultExpanded: true,
    items: [
      {
        external: true,
        href: 'https://github.com/CharlesStover',
        text: 'GitHub',
        type: 'link',
      },
      {
        external: true,
        href: 'https://www.linkedin.com/in/charles-stover/',
        text: 'LinkedIn',
        type: 'link',
      },
      {
        external: true,
        href: 'https://medium.com/@Charles_Stover',
        text: 'Medium',
        type: 'link',
      },
      {
        external: true,
        href: 'https://www.npmjs.com/~charlesstover',
        text: 'NPM',
        type: 'link',
      },
      {
        external: true,
        href: 'https://www.reddit.com/user/Charles_Stover',
        text: 'Reddit',
        type: 'link',
      },
      {
        external: true,
        href: 'https://stackoverflow.com/users/4856301/charles-stover',
        text: 'StackOverflow',
        type: 'link',
      },
      {
        external: true,
        href: 'https://twitter.com/CharlesStover',
        text: 'Twitter',
        type: 'link',
      },
    ],
    text: 'Connect with me',
    type: 'section',
  },
];

export default function Navigation(): ReactElement {
  const { activeHref, handleFollow } = useReactRouterSideNavigation();

  return (
    <>
      <Box margin="m" variant="h2">
        Navigation
      </Box>
      <SideNavigation
        activeHref={activeHref}
        items={ITEMS}
        onFollow={handleFollow}
      />
    </>
  );
}
