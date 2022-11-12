import { useContext } from 'react';
import WrapperVariantContent from '../contexts/wrapper-variant';

export default function useWrapperVariant(): 'table' | 'wizard' | undefined {
  const wrapperVariant: 'table' | 'wizard' | null | undefined = useContext(
    WrapperVariantContent,
  );

  if (wrapperVariant === null) {
    throw new Error('Expected the wrapper variant to be provided.');
  }

  return wrapperVariant;
}
