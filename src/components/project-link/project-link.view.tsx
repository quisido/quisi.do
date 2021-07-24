import Box from '@awsui/components-react/box';
import AwsuiLink from '@awsui/components-react/link';
import type { ReactElement } from 'react';
import useProjectLink from './project-link.hook';
import styles from './project-link.module.scss';

interface Props {
  readonly children: string;
  readonly icon: string;
  readonly to: string;
}

export default function ProjectLink({
  children,
  icon,
  to,
}: Props): ReactElement {
  const { handleFollow } = useProjectLink({ to });

  return (
    <AwsuiLink className={styles.root} href={to} onFollow={handleFollow}>
      <Box fontSize="heading-l" padding="xxl">
        {icon} {children}
      </Box>
    </AwsuiLink>
  );
}
