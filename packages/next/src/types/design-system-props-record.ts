import { type PropsWithChildren } from 'react';
import { type Props as BannerProps } from '../components/banner.js';
import { type Props as ButtonProps } from '../components/button.js';
import { type Props as CardsProps } from '../components/cards.js';
import { type Props as CheckboxProps } from '../components/checkbox.js';
import { type Props as ChipProps } from '../components/chip.js';
import { type Props as DivProps } from '../components/div.js';
import { type Props as HeaderProps } from '../components/header/index.js';
import { type Props as InputProps } from '../components/input.js';
import { type Props as LinkProps } from '../components/link/index.js';
import { type Props as SectionProps } from '../components/section.js';
import { type Props as SelectProps } from '../components/select.js';
import { type Props as SpanProps } from '../components/span.js';
import { type Props as TableProps } from '../components/table.js';

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
