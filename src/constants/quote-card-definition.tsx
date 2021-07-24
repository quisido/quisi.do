import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { CardsProps } from '@awsui/components-react/cards';
import type { ReactElement } from 'react';
import type Quote from '../types/quote';
import styles from './quote-card-definition.module.scss';

const IMAGE_SIZE = 100;

const IMAGE_MARGIN: BoxProps.Spacing = {
  bottom: 'n',
  left: 'l',
  right: 'm',
  // top: 'm',
};

const QUOTE_CARD_DEFINITION: CardsProps<Quote>['cardDefinition'] = {
  header({ author, company, title }: Readonly<Quote>): ReactElement {
    return (
      <Box textAlign="center">
        <Box margin="xxxs" color="text-label">
          {author}
        </Box>
        {typeof title === 'string' && (
          <Box display="block" margin="xxxs" variant="small">
            {title}
          </Box>
        )}
        {typeof company === 'string' && (
          <Box display="block" margin="xxxs" variant="small">
            {company}
          </Box>
        )}
      </Box>
    );
  },
  sections: [
    {
      id: 'quote',
      content({ age, author, gender, image, quote }: Quote): ReactElement {
        return (
          <>
            {typeof image === 'string' && (
              <Box float="right" margin={IMAGE_MARGIN}>
                <img
                  alt={author}
                  className={styles.image}
                  height={IMAGE_SIZE}
                  src={image}
                  width={IMAGE_SIZE}
                />
              </Box>
            )}
            <span data-ssml-voice-age={age} data-ssml-voice-gender={gender}>
              {quote}
            </span>
          </>
        );
      },
    },
  ],
};

export default QUOTE_CARD_DEFINITION;
