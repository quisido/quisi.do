import { type ReactElement } from 'react';
import Div from '../../../../components/div/index.js';
import Span from '../../../../components/span/index.js';
import type Quote from '../../types/quote.js';

export default function CardHeader({
  author,
  company,
  title,
}: Readonly<Quote>): ReactElement {
  return (
    <Div display="flex" flexDirection="column" textAlign="center">
      <Span size="medium">{author}</Span>
      {typeof title !== 'undefined' && (
        <Span color="label" size="small">
          {title}
        </Span>
      )}
      {typeof company !== 'undefined' && (
        <Span color="label" size="small">
          {company}
        </Span>
      )}
    </Div>
  );
}
