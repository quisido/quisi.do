import type { ReactNode } from 'react';

export interface BaseFigureProps {
  /**
   * the position of the caption in the DOM
   * @default 'start'
   */
  readonly captionPosition?: 'start' | 'end' | undefined;
  readonly children: ReactNode;
  /** visible content that describes the figure */
  readonly description?: ReactNode | undefined;
  readonly id?: string | undefined;
}

// If you don't have a label, you must have a caption.
export interface CaptionFigureProps extends BaseFigureProps {
  /** visible content that names the figure */
  readonly caption: ReactNode;
  readonly label?: undefined;
  readonly labelledBy?: undefined;
}

// If you have a label, caption is optional and labelled by is forbidden.
export interface LabelFigureProps extends BaseFigureProps {
  /** visible content that captions the figure */
  readonly caption?: ReactNode | undefined;
  readonly label: string;
  readonly labelledBy?: undefined;
}

// If you have a labelled by, caption is optional and label is forbidden.
export interface LabelledByFigureProps extends BaseFigureProps {
  /** visible content that captions the figure */
  readonly caption?: ReactNode | undefined;
  readonly label?: undefined;
  readonly labelledBy: string;
}

export type FigureProps =
  CaptionFigureProps | LabelFigureProps | LabelledByFigureProps;
