import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { SelectProps } from '@awsui/components-react/select';
import { useCallback, useMemo } from 'react';
import Language from '../../constants/language';
import LANGUAGE_OPTIONS from '../../constants/language-options';
import useLanguage from '../../hooks/use-language';

interface State {
  handleChange(event: NonCancelableCustomEvent<SelectProps.ChangeDetail>): void;
  selectedOption: SelectProps.Option;
}

export default function useLanguageSelect(): State {
  const [language, setLanguage] = useLanguage();

  return {
    handleChange: useCallback(
      (e: NonCancelableCustomEvent<SelectProps.ChangeDetail>): void => {
        // We can assert the type to be a `Language` enum value, because we only
        //   set the select values to be `Language` enum values.
        setLanguage(e.detail.selectedOption.value as Language);
      },
      [setLanguage],
    ),

    selectedOption: useMemo((): SelectProps.Option => {
      const findSelectedOption = ({ value }: SelectProps.Option): boolean =>
        value === language;
      // Since `language` is a Language enum value and all Language enum values
      //   have a corresponding option, we can assert that an option was found.
      return LANGUAGE_OPTIONS.find(findSelectedOption) as SelectProps.Option;
    }, [language]),
  };
}
