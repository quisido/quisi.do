import type { ReactElement } from 'react';
import Cards from '../../../../components/cards';
import BionicReadingContext from '../../../../contexts/bionic-reading';
import CardContent from '../../components/card-content';
import CardHeader from '../../components/card-header';
import CardsHeader from '../../components/cards-header';
import ITEMS from '../../constants/quotes';
import useQuotesContent from './content.hook';

export default function QuotesContent(): ReactElement {
  const { bionicReadingEnabled, onBionicReadingToggle } = useQuotesContent();
  return (
    <BionicReadingContext.Provider value={bionicReadingEnabled}>
      <Cards
        CardContent={CardContent}
        CardHeader={CardHeader}
        cardKey="author"
        header={
          <CardsHeader
            bionicReadingEnabled={bionicReadingEnabled}
            onBionicReadingToggle={onBionicReadingToggle}
          />
        }
        items={ITEMS}
      />
    </BionicReadingContext.Provider>
  );
}
