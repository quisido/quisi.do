import Box from '@awsui/components-react/box';
import AwsuiLink from '@awsui/components-react/link';
import { ReactElement } from 'react';
import useProjectLink from './project-link.hook';
import styles from './project-link.module.scss';

interface Props {
  children: string;
  icon: string;
  to: string;
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
