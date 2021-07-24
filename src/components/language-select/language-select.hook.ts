import type { SelectProps } from '@awsui/components-react/select';
import { useCallback, useMemo } from 'react';
import type Language from '../../constants/language';
import LANGUAGE_OPTIONS from '../../constants/language-options';
import useLanguage from '../../hooks/use-language';
import useSetLanguage from '../../hooks/use-set-language';
import type ReadonlySelectChangeEvent from '../../types/readonly-select-change-event';

interface State {
  selectedOption: SelectProps.Option;
  readonly handleChange: (event: ReadonlySelectChangeEvent) => void;
}

export default function useLanguageSelect(): State {
  const language: Language = useLanguage();
  const setLanguage = useSetLanguage();

  return {
    handleChange: useCallback(
      (e: ReadonlySelectChangeEvent): void => {
        // We can assert the type to be a `Language` enum value, because we only
        //   set the select values to be `Language` enum values.
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        setLanguage(e.detail.selectedOption.value as Language);
      },
      [setLanguage],
    ),

    selectedOption: useMemo((): SelectProps.Option => {
      const findSelectedOption = ({
        value,
      }: Readonly<SelectProps.Option>): boolean => value === language;
      // Since `language` is a Language enum value and all Language enum values
      //   have a corresponding option, we can assert that an option was found.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return LANGUAGE_OPTIONS.find(findSelectedOption)!;
    }, [language]),
  };
}
