import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { SelectProps } from '@awsui/components-react/select';
import { useCallback, useMemo } from 'react';
import { useCapsule } from 'react-capsule';
import LanguageCapsule from '../../capsules/language';
import Language from '../../constants/language';

interface State {
  handleChange(event: NonCancelableCustomEvent<SelectProps.ChangeDetail>): void;
  options: SelectProps.Option[];
  selectedOption: SelectProps.Option;
}

export default function useLanguageSelect(): State {
  const [language, setLanguage] = useCapsule(LanguageCapsule);

  const options: SelectProps.Option[] = useMemo((): SelectProps.Option[] => {
    return [
      {
        label: 'English',
        value: Language.English,
      },
      {
        label: 'Arabic',
        value: Language.Arabic,
      },
      {
        label: 'Cebuano',
        value: Language.Cebuano,
      },
      // {
      //   label: 'Japanese',
      //   value: Language.Japanese,
      // },
    ];
  }, []);

  return {
    options,

    handleChange: useCallback(
      (event: NonCancelableCustomEvent<SelectProps.ChangeDetail>): void => {
        // We can assert the type to be a `Language` enum value, because we only
        //   set the select values to be `Language` enum values.
        setLanguage(event.detail.selectedOption.value as Language);
      },
      [setLanguage],
    ),

    selectedOption: useMemo((): SelectProps.Option => {
      const findSelectedOption = ({ value }: SelectProps.Option): boolean =>
        value === language;
      // Since `language` is a Language enum value and all Language enum values
      //   have a corresponding option, we can assert that an option was found.
      return options.find(findSelectedOption) as SelectProps.Option;
    }, [language, options]),
  };
}
