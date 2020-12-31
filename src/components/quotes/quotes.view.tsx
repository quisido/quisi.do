import { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import Cards from '@awsui/components-react/cards';
import { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import CARD_DEFINITION from './constants/card-definition';
import ITEMS from './constants/quotes';

const BREADCRUMBS: BreadcrumbGroupProps.Item[] = [
  {
    href: '/quotes',
    text: 'Quotes',
  },
];

export default function Publications(): ReactElement {
  return (
    <AppLayout breadcrumbs={BREADCRUMBS} toolsHide>
      <Cards cardDefinition={CARD_DEFINITION} items={ITEMS} />
    </AppLayout>
  );
}
