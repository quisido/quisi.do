import { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';

const BREADCRUMBS: BreadcrumbGroupProps.Item[] = [
  {
    href: '/quotes',
    text: 'Quotes',
  },
];

export default function Quotes(): ReactElement {
  return <AppLayout breadcrumbs={BREADCRUMBS}>Quotes</AppLayout>;
}
