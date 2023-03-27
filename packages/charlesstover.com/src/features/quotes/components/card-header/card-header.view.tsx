import type { ReactElement } from 'react';
import Div from '../../../../components/div';
import Span from '../../../../components/span';
import isDefined from '../../../../utils/is-defined';
import type Quote from '../../types/quote';

export default function CardHeader({
  author,
  company,
  title,
}: Readonly<Quote>): ReactElement {
  return (
    <Div display="flex" flexDirection="column" textAlign="center">
      <Span size="medium">{author}</Span>
      {isDefined(title) && (
        <Span color="label" size="small">
          {title}
        </Span>
      )}
      {isDefined(company) && (
        <Span color="label" size="small">
          {company}
        </Span>
      )}
    </Div>
  );
}
