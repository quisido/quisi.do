import type { FigureProps } from './figure-props.js';
import useId from './use-id.js';

export interface FigureState {
  readonly describedBy: string | undefined;
  readonly descriptionId: string;
  readonly details: string | undefined;
  readonly labelledBy: string | undefined;
  readonly nameId: string;
}

export default function useFigure({
  description,
  label,
  labelledBy,
}: Pick<FigureProps, 'description' | 'label' | 'labelledBy'>): FigureState {
  const descriptionId: string = useId();
  const nameId: string = useId();

  return {
    // The figure is described by the description if it's a string.
    describedBy: ((): string | undefined => {
      if (typeof description !== 'string') {
        return;
      }

      return descriptionId;
    })(),

    descriptionId,

    // The figure is detailed by the description if it's an element.
    details: ((): string | undefined => {
      if (description === undefined || typeof description === 'string') {
        return;
      }

      return descriptionId;
    })(),

    labelledBy: ((): string | undefined => {
      if (typeof label === 'string') {
        return;
      }

      if (typeof labelledBy === 'string') {
        return labelledBy;
      }

      // With no other label, the caption must represent the accessible name.
      return nameId;
    })(),

    nameId,
  };
}
