import Box from '@awsui/components-react/box';
import Container from '@awsui/components-react/container';
import Header from '@awsui/components-react/header';
import { MutableRefObject, ReactElement, useEffect, useRef } from 'react';

interface Props {
  height: number;
  image: string;
  width: number;
}

export default function ApiGifResponse({
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
