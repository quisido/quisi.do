import type { CardsProps } from '@awsui/components-react/cards';
import Cards from '@awsui/components-react/cards';
import SpaceBetween from '@awsui/components-react/space-between';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Banner from '../../../../components/banner';
import NumberFormat from '../../../../components/number-format';
import Header from '../../components/header';
import CARD_DEFINITION from '../../constants/publications-card-definition';
import MINIMUM_VIEWS from '../../constants/minimum-publications-views';
import usePublicationsContents from './contents.hook';

export default function PublicationsContents(): ReactElement {
  const {
    handleAlertDismiss,
    handleSortChange,
    isBannerVisible,
    items,
    loading,
    loadingText,
    sort,
  } = usePublicationsContents();

  const optionalCardsProps: Pick<CardsProps, 'loadingText'> = {};
  if (typeof loadingText !== 'undefined') {
    optionalCardsProps.loadingText = loadingText;
  }

  return (
    <SpaceBetween direction="vertical" size="m">
      {isBannerVisible && (
        <Banner onDismiss={handleAlertDismiss}>
          <I18n count={<NumberFormat>{MINIMUM_VIEWS}</NumberFormat>}>
            Only publications with more than $count views are shown.
          </I18n>
        </Banner>
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
