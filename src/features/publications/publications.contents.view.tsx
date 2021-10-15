import type { AlertProps } from '@awsui/components-react/alert';
import Alert from '@awsui/components-react/alert';
import type { CardsProps } from '@awsui/components-react/cards';
import Cards from '@awsui/components-react/cards';
import SpaceBetween from '@awsui/components-react/space-between';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import NumberFormat from '../../components/number-format';
import CARD_DEFINITION from './publications.constant.card-definition';
import MINIMUM_VIEWS from './publications.constant.minimum-views';
import usePublicationsContents from './publications.contents.hook';
import Header from './publications.header.view';

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

  // Workaround until AWS UI supports TypeScript 4.4 exact optional properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const optionalAlertProps: Pick<AlertProps, 'dismissAriaLabel'> = {};
  if (typeof dismissAriaLabel !== 'undefined') {
    optionalAlertProps.dismissAriaLabel = dismissAriaLabel;
  }
  const optionalCardsProps: Pick<CardsProps, 'loadingText'> = {};
  if (typeof loadingText !== 'undefined') {
    optionalCardsProps.loadingText = loadingText;
  }

  return (
    <SpaceBetween direction="vertical" size="m">
      {isAlertVisible && (
        <Alert
          dismissible
          onDismiss={handleAlertDismiss}
          type="info"
          visible={true}
          {...optionalAlertProps}
        >
          <I18n count={<NumberFormat>{MINIMUM_VIEWS}</NumberFormat>}>
            Only publications with more than $count views are shown.
          </I18n>
        </Alert>
      )}
      <Cards
        cardDefinition={CARD_DEFINITION}
        header={<Header onSortChange={handleSortChange} sort={sort} />}
        items={items}
        loading={loading}
        {...optionalCardsProps}
      />
    </SpaceBetween>
  );
}
