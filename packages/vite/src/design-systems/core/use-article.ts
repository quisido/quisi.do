import useId from './use-id.js';

export interface ArticleState {
  readonly headingId: string;
  readonly labelledBy: string | undefined;
  readonly tabIndex: 0 | -1;
}

interface Props {
  readonly labelledBy: string | undefined;
  readonly tabbable: boolean;
}

export default function useArticle({
  labelledBy,
  tabbable,
}: Props): ArticleState {
  const headingId: string = useId();

  return {
    headingId,
    labelledBy: labelledBy ?? headingId,
    tabIndex: ((): 0 | -1 => {
      if (tabbable) {
        return 0;
      }
      return -1;
    })(),
  };
}
