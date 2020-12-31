import Box from '@awsui/components-react/box';
import HelpPanel from '@awsui/components-react/help-panel';
import { ReactElement } from 'react';

export default function AutomaticDimensionInfo(): ReactElement {
  return (
    <HelpPanel header="Automatic dimension">
      <Box variant="p">
        If the sprite sheet is wider than it is tall, the dimension represents
        the width of each sprite.
      </Box>
      <Box variant="p">
        If the sprite sheet is taller than it is wide, the dimension represents
        the height of each sprite.
      </Box>
    </HelpPanel>
  );
}
