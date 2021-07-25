import Box from '@awsui/components-react/box';
import type { CSSProperties, ReactElement } from 'react';
import { useMemo } from 'react';
import type Project from '../../types/project';

export default function HomeProjectListItem({
  icon,
  name,
}: Project): ReactElement {
  const style: CSSProperties = useMemo(
    (): CSSProperties => ({
      listStyleType: `"${icon}"`,
    }),
    [icon],
  );

  return (
    <li style={style}>
      <Box fontSize="heading-l" margin="s">
        {name}
      </Box>
    </li>
  );
}
