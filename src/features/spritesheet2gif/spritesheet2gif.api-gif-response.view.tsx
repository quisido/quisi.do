import Box from '@awsui/components-react/box';
import Container from '@awsui/components-react/container';
import Header from '@awsui/components-react/header';
import type { MutableRefObject, ReactElement } from 'react';
import { useEffect, useRef } from 'react';

interface Props {
  readonly height: number;
  readonly image: string;
  readonly width: number;
}

export default function Spritesheet2GifApiGifResponse({
  height,
  image,
  width,
}: Props): ReactElement {
  const ref: MutableRefObject<HTMLImageElement | null> = useRef(null);

  useEffect((): void => {
    if (ref.current === null) {
      return;
    }
    ref.current.scrollIntoView();
  }, [image]);

  return (
    <Container header={<Header>Result</Header>}>
      <Box textAlign="center">
        <img height={height} ref={ref} src={image} width={width} />
      </Box>
    </Container>
  );
}
