import Alert from '@awsui/components-react/alert';
import { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import Cards from '@awsui/components-react/cards';
// import Header from '@awsui/components-react/header';
import SpaceBetween from '@awsui/components-react/space-between';
import { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import usePublications from './publications.hook';

const BREADCRUMBS: BreadcrumbGroupProps.Item[] = [
  {
    href: '/publications',
    text: 'Publications',
  },
];

export default function Publications(): ReactElement {
  const {
    cardDefinition,
    handleAlertDismiss,
    isAlertVisible,
    items,
    loading,
  } = usePublications();

  return (
    <AppLayout breadcrumbs={BREADCRUMBS}>
      <SpaceBetween direction="vertical" size="m">
        {isAlertVisible && (
          <Alert
            dismissAriaLabel="Dismiss"
            dismissible
            onDismiss={handleAlertDismiss}
            type="info"
            visible={true}
          >
            Only publications with more than 2,500 views are shown.
          </Alert>
        )}
        <Cards
          cardDefinition={cardDefinition}
          // header={<Header>Publications</Header>}
          items={items}
          loading={loading}
          loadingText="Loading publications"
        />
      </SpaceBetween>
    </AppLayout>
  );
}
