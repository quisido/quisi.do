import type { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import type { ReactElement } from 'react';
import Box from '../../components/box';
import type BreadcrumbType from '../../types/breadcrumb';
import mapComponentToPropMapper from '../../utils/map-component-to-prop-mapper';
import BreadcrumbComponent from './wrapper.mui-breadcrumb.view';
import useWrapperMuiBreadcrumbs from './wrapper.mui-breadcrumbs.hook';

interface Props {
  readonly children: readonly Readonly<BreadcrumbType>[];
}

const mapBreadcrumbPropsToBreadcrumb =
  mapComponentToPropMapper(BreadcrumbComponent);

export default function WrapperMuiBreadcrumbs({
  children: breadcrumbs,
}: Readonly<Props>): ReactElement {
  const { ariaLabel, breadcrumbProps, expandText } =
    useWrapperMuiBreadcrumbs(breadcrumbs);

  // Workaround until MUI supports TypeScript 4.4 exact optional properties.
  const optionalProps: Pick<BreadcrumbsProps, 'expandText'> = {};
  if (typeof expandText !== 'undefined') {
    optionalProps.expandText = expandText;
  }

  return (
    <Box marginY="small">
      <Breadcrumbs aria-label={ariaLabel} {...optionalProps}>
        {breadcrumbProps.map(mapBreadcrumbPropsToBreadcrumb)}
      </Breadcrumbs>
    </Box>
  );
}
