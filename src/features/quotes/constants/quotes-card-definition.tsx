import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { CardsProps } from '@awsui/components-react/cards';
import type { ReactElement } from 'react';
import Div from '../../../components/div';
import validateString from '../../../utils/validate-string';
import type Quote from '../types/quote';
import styles from './quotes-card-definition.module.scss';

const IMAGE_SIZE = 100;
const imageClassName: string = validateString(styles.image);

const IMAGE_MARGIN: BoxProps.Spacing = {
  bottom: 'n',
  left: 'l',
  right: 'm',
  // top: 'm',
};

const QUOTE_CARD_DEFINITION: CardsProps<Quote>['cardDefinition'] = {
  header({ author, company, title }: Readonly<Quote>): ReactElement {
    return (
      <Div textAlign="center">
        <Box color="text-label" margin="xxxs">
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
      </Div>
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
                  className={imageClassName}
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
