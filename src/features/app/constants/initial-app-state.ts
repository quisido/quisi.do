import DesignSystem from '../../../constants/design-system';
import Language from '../../../constants/language';
import type AppState from '../types/app-state';

const INITIAL_APP_STATE: AppState = {
  designSystem: DesignSystem.Aws,
  isDarkModeEnabled: true,
  language: Language.English,
};

export default INITIAL_APP_STATE;
