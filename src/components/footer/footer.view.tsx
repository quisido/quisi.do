import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import validateString from '../../utils/validate-string';
import useFooter from './footer.hook';
import styles from './footer.module.scss';
import Link from './footer.view.link';

const rootClassName: string = validateString(styles.root);

const MARGIN: BoxProps.Spacing = {
  top: 'l',
};

export default function Footer(): ReactElement {
  const { versionHref } = useFooter();

  return (
    <Box
      className={rootClassName}
      color="text-label"
      margin={MARGIN}
      textAlign="center"
    >
      <span>&copy; Charles Stover</span>
      <span>
        <Link>{versionHref}</Link>
      </span>
    </Box>
  );
}
