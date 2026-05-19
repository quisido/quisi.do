import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import { Paragraph, Region } from '../../../design-systems/template/index.js';

export default function CharitiesPage(): ReactElement {
  return (
    <Region heading={<I18n>Charities</I18n>}>
      <Paragraph>
        quisi.do is in the process of defining charities. As this matter has
        legal, financial, and moral implications, the decisions will not be made
        lightly and will be posted after they are ready.
      </Paragraph>
    </Region>
  );
}
