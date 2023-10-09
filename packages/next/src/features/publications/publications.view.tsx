import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Div from '../..//components/div';
import Banner from '../../components/banner';
import Cards from '../../components/cards';
import NumberFormat from '../../components/number-format';
import CardContent from './components/card-content';
import CardHeader from './components/card-header';
import Header from './components/header';
import MINIMUM_VIEWS from './constants/minimum-publications-views';
import usePublications from './publications.hook';

export default function Publications(): ReactElement {
  const {
    handleMediumApiBannerDismiss,
    handleMinimumViewsBannerDismiss,
    handleSortChange,
    isMediumApiBannerVisible,
    isMinimumViewsBannerVisible,
    items,
    loading,
    sort,
  } = usePublications();

  return (
    <>
      {isMediumApiBannerVisible && (
        <Div marginBottom="medium">
          <Banner onDismiss={handleMediumApiBannerDismiss}>
            <I18n>
              Due to a dependency API change, publication statistics are locked
              to July 2023.
            </I18n>
          </Banner>
        </Div>
      )}
      {isMinimumViewsBannerVisible && (
        <Div marginBottom="medium">
          <Banner onDismiss={handleMinimumViewsBannerDismiss}>
            <I18n count={<NumberFormat>{MINIMUM_VIEWS}</NumberFormat>}>
              Only publications with more than $count views are shown.
            </I18n>
          </Banner>
        </Div>
      )}
      <Cards
        CardContent={CardContent}
        CardHeader={CardHeader}
        cardKey="url"
        header={<Header onSortChange={handleSortChange} sort={sort} />}
        items={items}
        loading={loading}
      />
    </>
  );
}
