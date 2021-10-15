import Box from '@awsui/components-react/box';
import HelpPanel from '@awsui/components-react/help-panel';
import type { ReactElement } from 'react';

export default function Spritesheet2GifHeaderInfo(): ReactElement {
  return (
    <HelpPanel header="About">
      <Box variant="p">
        You can convert your sprite sheet images to animated GIFs with this
        simple online tool.
      </Box>
      <Box variant="p">
        To generate an animated GIF, browse your computer for a sprite sheet.
        GIF, JPEG, and PNG sprite sheets are supported. Select the desired
        options for your animation, then click <em>Convert</em>.
      </Box>
    </HelpPanel>
  );
}
