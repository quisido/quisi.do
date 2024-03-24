import { useTranslate, type TranslateFunction } from 'lazy-i18n';
import { type ReactElement } from 'react';
import { Pie, Surface } from 'recharts';
import validateString from '../../../../utils/validate-string.js';
import styles from './apdex-pie-chart.module.scss';

interface Props {
  readonly frustrated: number;
  readonly satisfied: number;
  readonly tolerated: number;
}

const CIRCLE = 360;
const HALF = 0.5;
const QUARTER = 0.25;
const rootClassName: string = validateString(styles['root']);
const SIZE = 240;
const START_ANGLE = 90;
const END_ANGLE = START_ANGLE + CIRCLE;
const HALF_SIZE: number = SIZE * HALF;
const QUARTER_SIZE: number = SIZE * QUARTER;

enum Fill {
  Frustrated = '#d6436f',
  Satisfied = '#43d660',
  Tolerated = '#d6aa43',
}

export default function ApdexPieChart({
  frustrated,
  satisfied,
  tolerated,
}: Props): ReactElement {
  const translate: TranslateFunction = useTranslate();

  const total: number = frustrated + satisfied + tolerated;
  // const frustratedPercent: number = frustrated / total;
  const satisfiedPercent: number = satisfied / total;
  const toleratedPercent: number = tolerated / total;

  const satisfiedEndAngle: number = START_ANGLE + satisfiedPercent * CIRCLE;
  const toleratedEndAngle: number =
    satisfiedEndAngle + toleratedPercent * CIRCLE;

  return (
    <Surface className={rootClassName} height={SIZE} width={SIZE}>
      <Pie
        cx={HALF_SIZE}
        cy={HALF_SIZE}
        data={[
          { name: translate('Satisfied') ?? 'Satisfied', value: satisfied },
          { name: translate('Tolerated') ?? 'Tolerated', value: tolerated },
          { name: translate('Frustrated') ?? 'Frustrated', value: frustrated },
        ]}
        dataKey="value"
        innerRadius={QUARTER_SIZE}
        outerRadius={HALF_SIZE}
        sectors={[
          {
            cx: HALF_SIZE,
            cy: HALF_SIZE,
            endAngle: satisfiedEndAngle,
            fill: Fill.Satisfied,
            innerRadius: QUARTER_SIZE,
            name: translate('Satisfied') ?? 'Satisfied',
            outerRadius: HALF_SIZE,
            startAngle: START_ANGLE,
            value: satisfied,
          },
          {
            cx: HALF_SIZE,
            cy: HALF_SIZE,
            endAngle: toleratedEndAngle,
            fill: Fill.Tolerated,
            innerRadius: QUARTER_SIZE,
            name: translate('Tolerated') ?? 'Tolerated',
            outerRadius: HALF_SIZE,
            startAngle: satisfiedEndAngle,
            value: tolerated,
          },
          {
            cx: HALF_SIZE,
            cy: HALF_SIZE,
            endAngle: END_ANGLE,
            fill: Fill.Frustrated,
            innerRadius: QUARTER_SIZE,
            name: translate('Frustrated') ?? 'Frustrated',
            outerRadius: HALF_SIZE,
            startAngle: toleratedEndAngle,
            value: frustrated,
          },
        ]}
      />
    </Surface>
  );
}
