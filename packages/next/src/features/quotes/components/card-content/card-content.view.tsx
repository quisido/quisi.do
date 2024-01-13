import Image from 'next/image.js';
import { type ReactElement } from 'react';
import Div from '../../../../components/div/index.js';
import validateString from '../../../../utils/validate-string.js';
import type Quote from '../../types/quote.js';
import styles from './card-content.module.scss';

const IMAGE_SIZE = 100;
const imageClassName: string = validateString(styles['image']);

export default function CardContent({
  age,
  author,
  gender,
  image,
  quote,
}: Readonly<Quote>): ReactElement {
  return (
    <>
      {typeof image !== 'undefined' && (
        <Div float="right" marginLeft="large" marginRight="medium">
          <Image
            alt={author}
            className={imageClassName}
            height={IMAGE_SIZE}
            src={image}
            width={IMAGE_SIZE}
          />
        </Div>
      )}
      <span data-ssml-voice-age={age} data-ssml-voice-gender={gender}>
        {quote}
      </span>
    </>
  );
}
