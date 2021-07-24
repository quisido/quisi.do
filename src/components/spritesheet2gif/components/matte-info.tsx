import Box from '@awsui/components-react/box';
import HelpPanel from '@awsui/components-react/help-panel';
import type { ReactElement } from 'react';

export default function MatteInfo(): ReactElement {
  return (
    <HelpPanel header="Matte">
      <Box variant="p">
        If your sprite sheet has a red background color, you would want to use a
        red matte so that your animation is transparent.
      </Box>
      <Box variant="p">
        If your sprite sheet uses a lot of red in the foreground, you would{' '}
        <em>not</em> want to use a red matte. This would cause the red in the
        foreground to become transparent. An off-colored but similar alternative
        that does not appear in the sprite sheet would be a possible solution.
      </Box>
      <Box variant="p">
        If your sprite sheet is already transparent, choose a color not present
        in the image.
      </Box>
      <Box variant="p">
        For translucent PNG sprite sheets, this is the background color your
        animated GIF will fade into, as if your PNG were placed on top of this
        color.
      </Box>
    </HelpPanel>
  );
}
