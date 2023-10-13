import { type ReactElement } from 'react';
import Container from '../../../components/container';
import Div from '../../../components/div';
import Header from '../../../components/header';
import Link from '../../../components/link';
import validateString from '../../../utils/validate-string';
import styles from './styles.module.scss';

const rootClassName: string = validateString(styles.root);

export { default as generateStaticParams } from '../../../features/generate-locale-static-params';

export default function SpriteSheet2GIFPage(): ReactElement {
  return (
    <Container
      className={rootClassName}
      header={<Header>Animate a sprite sheet</Header>}
    >
      <Div element="p">
        The sprite sheet to GIF converter was a long-running tool for converting
        sprite sheets to animated GIFs. Launched in 2015, it serviced thousands
        of customers and held a top rank on Google. In June 2023, the service
        was terminated.
      </Div>
      <Div element="p">
        If you want to replicate the sprite sheet to GIF converter, you can find{' '}
        <Link
          category="features/spritesheet2gif"
          href="https://github.com/CharlesStover/spritesheet2gif-api/"
          title="CharlesStover/spritesheet2gif-api: a back end API for converting sprite sheets to GIFs"
        >
          the original source code on GitHub
        </Link>{' '}
        and{' '}
        <Link
          category="features/spritesheet2gif"
          href="https://hub.docker.com/r/charlesstover/spritesheet2gif-api"
          title="charlesstover/spritesheet2gif-api - Docker Image | DockerHub"
        >
          the Docker image on DockerHub
        </Link>
        .
      </Div>
    </Container>
  );
}
