import Box from '@awsui/components-react/box';
import HelpPanel from '@awsui/components-react/help-panel';
import type { ReactElement } from 'react';

export default function AutomaticDirectionInfo(): ReactElement {
  return (
    <HelpPanel header="Automatic direction">
      <Box variant="p">
        If the sprite sheet is wider than it is tall, then the sprite&apos;s
        height will be equal to the height of the sprite sheet.
      </Box>
      <Box variant="p">
        If the sprite sheet is taller than it is wide, then the sprite&apos;s
        width will be equal to the width of the sprite sheet.
      </Box>
    </HelpPanel>
  );
}
