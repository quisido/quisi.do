import SpaceBetween from '@awsui/components-react/space-between';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Banner from '../../../../components/banner';
import CardContent from '../../components/card-content';
import CardHeader from '../../components/card-header';
import Cards from '../../../../components/cards';
import NumberFormat from '../../../../components/number-format';
import Header from '../../components/header';
import MINIMUM_VIEWS from '../../constants/minimum-publications-views';
import usePublicationsContent from './content.hook';

export default function PublicationsContent(): ReactElement {
  const {
    handleBannerDismiss,
    handleSortChange,
    isBannerVisible,
    items,
    loading,
    sort,
  } = usePublicationsContent();

  return (
    <SpaceBetween direction="vertical" size="m">
      {isBannerVisible && (
        <Banner onDismiss={handleBannerDismiss}>
          <I18n count={<NumberFormat>{MINIMUM_VIEWS}</NumberFormat>}>
            Only publications with more than $count views are shown.
          </I18n>
        </Banner>
      )}
      <Cards
        CardContent={CardContent}
        CardHeader={CardHeader}
        header={<Header onSortChange={handleSortChange} sort={sort} />}
        items={items}
        loading={loading}
      />
    </SpaceBetween>
  );
}
