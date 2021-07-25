import Alert from '@awsui/components-react/alert';
import Cards from '@awsui/components-react/cards';
import SpaceBetween from '@awsui/components-react/space-between';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import NumberFormat from '../../components/number-format';
import CARD_DEFINITION from './publications.constant.card-definition';
import MINIMUM_VIEWS from './publications.constant.minimum-views';
import usePublicationsContents from './publications.hook.contents';
import Header from './publications.view.header';

export default function PublicationsContents(): ReactElement {
  const {
    dismissAriaLabel,
    handleAlertDismiss,
    handleSortChange,
    isAlertVisible,
    items,
    loading,
    loadingText,
    sort,
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
        header={<Header onSortChange={handleSortChange} sort={sort} />}
      />
    </SpaceBetween>
  );
}
