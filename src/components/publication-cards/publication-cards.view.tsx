import Alert from '@awsui/components-react/alert';
import Cards from '@awsui/components-react/cards';
import FormField from '@awsui/components-react/form-field';
import Header from '@awsui/components-react/header';
import Select from '@awsui/components-react/select';
import SpaceBetween from '@awsui/components-react/space-between';
import I18n from 'lazy-i18n';
import { ReactElement } from 'react';
import CARD_DEFINITION from '../../constants/publication-card-definition';
import usePublicationCards from './publication-cards.hook';
import styles from './publication-cards.module.scss';

export default function PublicationCards(): ReactElement {
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
  } = usePublicationCards();

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
          Only publications with more than 5,000 views are shown.
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
