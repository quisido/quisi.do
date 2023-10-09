import Breadcrumbs, { type BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import { type ReactElement } from 'react';
import type BreadcrumbType from '../../../../../../types/breadcrumb';
import mapComponentToPropMapper from '../../../../../../utils/map-component-to-prop-mapper';
import Div from '../../../div';
import Breadcrumb from '../breadcrumb';
import useWrapperBreadcrumbs from './breadcrumbs.hook';

interface Props {
  readonly children: readonly Readonly<BreadcrumbType>[];
}

const mapBreadcrumbPropsToElement = mapComponentToPropMapper(Breadcrumb);

export default function WrapperMuiBreadcrumbs({
  children: breadcrumbs,
}: Props): ReactElement {
  const { ariaLabel, breadcrumbProps, expandText } =
    useWrapperBreadcrumbs(breadcrumbs);

  // Workaround until MUI supports TypeScript 4.4 exact optional properties.
  const optionalProps: Pick<BreadcrumbsProps, 'expandText'> = {};
  if (typeof expandText !== 'undefined') {
    optionalProps.expandText = expandText;
  }

  return (
    <Div marginY="small">
      <Breadcrumbs aria-label={ariaLabel} {...optionalProps}>
        {breadcrumbProps.map(mapBreadcrumbPropsToElement)}
      </Breadcrumbs>
    </Div>
  );
}
