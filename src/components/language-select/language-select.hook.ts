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

const ENGLISH_OPTION: SelectProps.Option = {
  label: 'English',
  value: Language.English,
};

export default function useLanguageSelect(): State {
  const [language, setLanguage] = useCapsule(LanguageCapsule);

  const options: SelectProps.Option[] = useMemo((): SelectProps.Option[] => {
    return [
      ENGLISH_OPTION,
      {
        label: 'Cebuano',
        value: Language.Cebuano,
      },
    ];
  }, []);

  return {
    options,
    handleChange: useCallback(
      (event: NonCancelableCustomEvent<SelectProps.ChangeDetail>): void => {
        setLanguage(event.detail.selectedOption.value as Language);
      },
      [setLanguage],
    ),
    selectedOption: useMemo((): SelectProps.Option => {
      const findSelectedOption = ({ value }: SelectProps.Option): boolean =>
        value === language;
      return options.find(findSelectedOption) || ENGLISH_OPTION;
    }, [language, options]),
  };
}
