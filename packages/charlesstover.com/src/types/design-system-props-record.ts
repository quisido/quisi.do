import { PropsWithChildren } from 'react';
import type { Props as BannerProps } from '../components/banner';
import type { Props as ButtonProps } from '../components/button';
import type { Props as CardsProps } from '../components/cards';
import type { Props as CheckboxProps } from '../components/checkbox';
import type { Props as ChipProps } from '../components/chip';
import type { Props as ContainerProps } from '../components/container';
import type { Props as DivProps } from '../components/div';
import type { Props as HeaderProps } from '../components/header';
import type { Props as LinkProps } from '../components/link';
import type { Props as SelectProps } from '../components/select';
import type { Props as SpanProps } from '../components/span';
import type { Props as TableProps } from '../components/table';
import type { Props as WrapperProps } from '../components/wrapper';

export default interface DesignSystemPropsRecord<
  Card extends object,
  Row extends object,
> {
  readonly banner: BannerProps;
  readonly button: ButtonProps;
  readonly cards: CardsProps<Card>;
  readonly checkbox: CheckboxProps;
  readonly chip: ChipProps;
  readonly container: ContainerProps;
  readonly div: DivProps;
  readonly header: HeaderProps;
  readonly link: LinkProps;
  readonly 'loading-icon': Record<string, never>;
  readonly select: SelectProps;
  readonly span: SpanProps;
  readonly table: TableProps<Row>;
  readonly theme: Readonly<PropsWithChildren>;
  readonly wrapper: WrapperProps;
}
