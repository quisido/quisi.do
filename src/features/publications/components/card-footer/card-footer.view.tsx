import Box from '@awsui/components-react/box';
import ColumnLayout from '@awsui/components-react/column-layout';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Span from '../../../../components/span';
import mapTimeToDaysAgo from '../../../../utils/map-time-to-days-ago';
import validateString from '../../../../utils/validate-string';
import type Publication from '../../types/publication';
import ratio from '../../utils/ratio';
import styles from './card-footer.module.scss';

const columnLayoutClassName: string = validateString(styles.columnLayout);
const TWO = 2;

export default function PublicationsCardFooter({
  dateTime,
  reactions,
  views,
}: Readonly<Publication>): ReactElement {
  return (
    <ColumnLayout className={columnLayoutClassName} columns={12}>
      <div>
        <Box fontSize="heading-s">
          <Span color="label">
            <I18n>Reactions/day</I18n>
          </Span>
        </Box>
        {ratio(reactions, mapTimeToDaysAgo(dateTime))}
      </div>
      <div>
        <Box fontSize="heading-s">
          <Span color="label">
            <I18n>Reactions/view</I18n>
          </Span>
        </Box>
        {ratio(reactions, views, TWO)}%
      </div>
      <div>
        <Box fontSize="heading-s">
          <Span color="label">
            <I18n>Views/day</I18n>
          </Span>
        </Box>
        {ratio(views, mapTimeToDaysAgo(dateTime))}
      </div>
    </ColumnLayout>
  );
}
