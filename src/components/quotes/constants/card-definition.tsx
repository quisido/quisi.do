import Box, { BoxProps } from '@awsui/components-react/box';
import { CardsProps } from '@awsui/components-react/cards';
import { CSSProperties, ReactElement } from 'react';
import Quote from '../types/quote';

const IMAGE_SIZE = 100;

const IMAGE_STYLE: CSSProperties = {
  borderRadius: 75,
};

const QUOTE_MARGIN: BoxProps.Spacing = {
  bottom: 'l',
  top: 'l',
};

const CARD_DEFINITION: CardsProps<Quote>['cardDefinition'] = {
  header({ author, image }: Quote): ReactElement {
    return (
      <Box textAlign="center">
        <img
          alt={author}
          height={IMAGE_SIZE}
          src={image}
          style={IMAGE_STYLE}
          width={IMAGE_SIZE}
        />
      </Box>
    );
  },
  sections: [
    {
      id: 'quote',
      content({ author, company, quote, title }: Quote): ReactElement {
        return (
          <>
            <Box margin={QUOTE_MARGIN}>{quote}</Box>
            {author && (
              <Box margin="xxxs" color="text-label">
                {author}
              </Box>
            )}
            {title && (
              <Box display="block" margin="xxxs" variant="small">
                {title}
              </Box>
            )}
            {company && (
              <Box display="block" margin="xxxs" variant="small">
                {company}
              </Box>
            )}
          </>
        );
      },
    },
  ],
};

export default CARD_DEFINITION;
