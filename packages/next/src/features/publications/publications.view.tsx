'use client'; // lazy-i18n

import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Div from '../..//components/div/index.js';
import Banner from '../../components/banner.js';
import Cards from '../../components/cards.js';
import NumberFormat from '../../components/number-format/index.js';
import CardContent from './components/card-content/index.js';
import CardHeader from './components/card-header/index.js';
import Header from './components/header/index.js';
import MINIMUM_VIEWS from './constants/minimum-publications-views.js';
import usePublications from './publications.hook.js';

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
