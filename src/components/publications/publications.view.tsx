import Alert from '@awsui/components-react/alert';
import { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import Cards from '@awsui/components-react/cards';
import FormField from '@awsui/components-react/form-field';
import Header from '@awsui/components-react/header';
import Select from '@awsui/components-react/select';
import SpaceBetween from '@awsui/components-react/space-between';
import { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import usePublications from './publications.hook';
import styles from './publications.module.scss';

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
    handleSortChange,
    isAlertVisible,
    items,
    loading,
    notifications,
    selectedSortOption,
    sortOptions,
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
          header={
            <Header
              actions={
                <FormField className={styles.sort} label="Sort by" stretch>
                  <Select
                    onChange={handleSortChange}
                    options={sortOptions}
                    placeholder="Sort by"
                    selectedOption={selectedSortOption}
                  />
                </FormField>
              }
            >
              Publications
            </Header>
          }
          items={items}
          loading={loading}
          loadingText="Loading publications"
        />
      </SpaceBetween>
    </AppLayout>
  );
}
