import Alert from '@awsui/components-react/alert';
import { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import Cards from '@awsui/components-react/cards';
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
    notifications,
  } = usePublications();

  return (
    <AppLayout
      breadcrumbs={BREADCRUMBS}
      notifications={notifications}
      toolsHide
    >
      <SpaceBetween direction="vertical" size="m">
        {isAlertVisible && (
          <Alert
            dismissAriaLabel="Dismiss"
            dismissible
            onDismiss={handleAlertDismiss}
            type="info"
            visible={true}
          >
            Only publications with more than 5,000 views are shown.
          </Alert>
        )}
        <Cards
          cardDefinition={cardDefinition}
          items={items}
          loading={loading}
          loadingText="Loading publications"
        />
      </SpaceBetween>
    </AppLayout>
  );
}
