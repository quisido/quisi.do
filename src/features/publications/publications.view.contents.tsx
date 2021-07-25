import Alert from '@awsui/components-react/alert';
import Cards from '@awsui/components-react/cards';
import FormField from '@awsui/components-react/form-field';
import Header from '@awsui/components-react/header';
import Select from '@awsui/components-react/select';
import SpaceBetween from '@awsui/components-react/space-between';
import I18n from 'lazy-i18n';
import NumberFormat from 'number-format-react';
import type { ReactElement } from 'react';
import CARD_DEFINITION from './publications.constant.card-definition';
import MINIMUM_VIEWS from './publications.constant.minimum-views';
import usePublicationsContents from './publications.hook.contents';
import styles from './publications.view.contents.module.scss';

export default function PublicationsContents(): ReactElement {
  const {
    dismissAriaLabel,
    handleAlertDismiss,
    handleSortChange,
    isAlertVisible,
    items,
    loading,
    loadingText,
    selectedSortOption,
    sortOptions,
    sortPlaceholder,
  } = usePublicationsContents();

  return (
    <SpaceBetween direction="vertical" size="m">
      {isAlertVisible && (
        <Alert
          dismissAriaLabel={dismissAriaLabel}
          dismissible
          onDismiss={handleAlertDismiss}
          type="info"
          visible={true}
        >
          <I18n count={<NumberFormat>{MINIMUM_VIEWS}</NumberFormat>}>
            Only publications with more than $count views are shown.
          </I18n>
        </Alert>
      )}
      <Cards
        cardDefinition={CARD_DEFINITION}
        items={items}
        loading={loading}
        loadingText={loadingText}
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
      />
    </SpaceBetween>
  );
}
