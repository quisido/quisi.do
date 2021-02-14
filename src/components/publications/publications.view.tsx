import Alert from '@awsui/components-react/alert';
import { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import Cards from '@awsui/components-react/cards';
import FormField from '@awsui/components-react/form-field';
import Header from '@awsui/components-react/header';
import Select from '@awsui/components-react/select';
import SpaceBetween from '@awsui/components-react/space-between';
import I18n from 'lazy-i18n';
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
    dismissAriaLabel,
    handleAlertDismiss,
    handleSortChange,
    isAlertVisible,
    items,
    loading,
    loadingText,
    // notifications,
    selectedSortOption,
    sortOptions,
    sortPlaceholder,
  } = usePublications();

  return (
    <AppLayout
      breadcrumbs={BREADCRUMBS}
      // notifications={notifications}
      toolsHide
    >
      <SpaceBetween direction="vertical" size="m">
        {isAlertVisible && (
          <Alert
            dismissAriaLabel={dismissAriaLabel}
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
                <FormField
                  className={styles.sort}
                  label={<I18n>Sort by</I18n>}
                  stretch
                >
                  <Select
                    onChange={handleSortChange}
                    options={sortOptions}
                    placeholder={sortPlaceholder}
                    selectedOption={selectedSortOption}
                  />
                </FormField>
              }
            >
              <I18n>Publications</I18n>
            </Header>
          }
          items={items}
          loading={loading}
          loadingText={loadingText}
        />
      </SpaceBetween>
    </AppLayout>
  );
}
