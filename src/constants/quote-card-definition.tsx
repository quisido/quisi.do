import Box, { BoxProps } from '@awsui/components-react/box';
import { CardsProps } from '@awsui/components-react/cards';
import { ReactElement } from 'react';
import Quote from '../types/quote';
import styles from './quote-card-definition.module.scss';

const IMAGE_SIZE = 100;

const IMAGE_MARGIN: BoxProps.Spacing = {
  bottom: 'n',
  left: 'l',
  right: 'm',
  // top: 'm',
};

const QUOTE_CARD_DEFINITION: CardsProps<Quote>['cardDefinition'] = {
  header({ author, company, title }: Quote): ReactElement {
    return (
      <Box textAlign="center">
        <Box margin="xxxs" color="text-label">
          {author}
        </Box>
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
      </Box>
    );
  },
  sections: [
    {
      id: 'quote',
      content({ age, author, gender, image, quote }: Quote): ReactElement {
        return (
          <>
            {image && (
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
