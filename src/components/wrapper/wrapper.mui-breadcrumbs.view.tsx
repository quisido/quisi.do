import type { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import type Breadcrumb from '../../types/breadcrumb';
import useWrapperMuiBreadcrumbs from './wrapper.mui-breadcrumbs.hook';

interface Props {
  readonly children: readonly Readonly<Breadcrumb>[];
}

export default function WrapperMuiBreadcrumbs({
  children: breadcrumbs,
}: Readonly<Props>): ReactElement {
  const { expandText, lastIndex } = useWrapperMuiBreadcrumbs(breadcrumbs);

  // Workaround until MUI supports TypeScript 4.4 exact optional properties.
  const optionalProps: Pick<BreadcrumbsProps, 'expandText'> = {};
  if (typeof expandText !== 'undefined') {
    optionalProps.expandText = expandText;
  }

  return (
    <Breadcrumbs {...optionalProps}>
      {breadcrumbs.map(
        (
          { children, path }: Readonly<Breadcrumb>,
          index: number,
        ): ReactElement => {
          if (index === lastIndex) {
            return (
              <Typography color="text.primary" key={index}>
                {children}
              </Typography>
            );
          }

          return (
            <MuiLink
              color="inherit"
              component={ReactRouterLink}
              key={index}
              to={path}
              underline="hover"
            >
              {children}
            </MuiLink>
          );
        },
      )}
    </Breadcrumbs>
  );
}
