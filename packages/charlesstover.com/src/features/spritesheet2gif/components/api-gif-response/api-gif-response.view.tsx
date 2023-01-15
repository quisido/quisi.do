import type { TranslateFunction } from 'lazy-i18n';
import I18n, { useTranslate } from 'lazy-i18n';
import type { MutableRefObject, ReactElement } from 'react';
import { useEffect, useRef } from 'react';
import Container from '../../../../components/container';
import validateString from '../../../../utils/validate-string';
import styles from './api-gif-response.module.scss';

interface Props {
  readonly height: number;
  readonly image: string;
  readonly width: number;
}

const centerClassName: string = validateString(styles.center);

export default function Spritesheet2GifApiGifResponse({
  height,
  image,
  width,
}: Readonly<Props>): ReactElement {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const ref: MutableRefObject<HTMLImageElement | null> = useRef(null);
  const alt: string = translate('Result') ?? '';

  // Effects
  useEffect((): void => {
    if (ref.current === null) {
      return;
    }
    ref.current.scrollIntoView();
  }, [image]);

  return (
    <Container header={<I18n>Result</I18n>}>
      <div className={centerClassName}>
        <img alt={alt} height={height} ref={ref} src={image} width={width} />
      </div>
    </Container>
  );
}
