import { type PropsWithChildren } from 'react';
import { type Props as BannerProps } from '../components/banner.js';
import { type Props as ButtonProps } from '../components/button.js';
import { type Props as CardsProps } from '../components/cards/index.js';
import { type Props as CheckboxProps } from '../components/checkbox/index.js';
import { type Props as ChipProps } from '../components/chip/index.js';
import { type Props as DivProps } from '../components/div/index.js';
import { type Props as HeaderProps } from '../components/header/index.js';
import { type Props as InputProps } from '../components/input/index.js';
import { type Props as LinkProps } from '../components/link/index.js';
import { type Props as SectionProps } from '../components/section.js';
import { type Props as SelectProps } from '../components/select/index.js';
import { type Props as SpanProps } from '../components/span/index.js';
import { type Props as TableProps } from '../components/table/index.js';

export default interface DesignSystemPropsRecord<
  Card extends object,
  Row extends object,
> {
  readonly banner: BannerProps;
  readonly button: ButtonProps;
  readonly cards: CardsProps<Card>;
  readonly checkbox: CheckboxProps;
  readonly chip: ChipProps;
  readonly div: DivProps;
  readonly header: HeaderProps;
  readonly input: InputProps;
  readonly link: LinkProps;
  readonly 'loading-icon': Record<string, never>;
  readonly section: SectionProps;
  readonly select: SelectProps;
  readonly span: SpanProps;
  readonly table: TableProps<Row>;
  readonly theme: Readonly<PropsWithChildren>;
}
