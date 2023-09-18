import { ComponentType, ReactElement, ReactNode, useContext } from 'react';
import loadingComponentContext from '../../contexts/loading-component';
import useTranslate from '../../hooks/use-translate';
import ReactNodeTranslationValue from '../../types/react-node-translation-value';
import TranslateFunction from '../../types/translate-function';
import mapChildrenToTranslationKey from './utils/map-children-to-translation-key';

interface Props extends Record<string, ReactNodeTranslationValue> {
  children: number | string | (number | string)[];
}

export default function I18n({ children, ...vars }: Props): ReactElement {
  const LoadingComponent: ComponentType<unknown> = useContext(
    loadingComponentContext,
  );
  const translate: TranslateFunction = useTranslate();

  const translation: ReactNode | string | undefined = translate(
    mapChildrenToTranslationKey(children),
    vars,
  );

  // If this locale's translations have not yet loaded, display the loading
  //   status indicator.
  if (typeof translation === 'undefined') {
    return <LoadingComponent />;
  }

  // If this locale's translations have loaded and are present, display the
  //   translation.
  return <>{translation}</>;
}
