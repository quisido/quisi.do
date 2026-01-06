import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Div from '../modules/quisi/div.jsx';
import Section from '../modules/quisi/section.jsx';

export default function NotFound(): ReactElement {
  return (
    <Section header={<I18n>Not Found</I18n>}>
      <Div element="p" marginBottom="medium">
        HTTP status code 404
      </Div>
    </Section>
  );
}
