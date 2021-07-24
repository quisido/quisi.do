import Language from '../../constants/language';
import type AppState from './app.type.state';

const INITIAL_APP_STATE: AppState = {
  isDarkModeEnabled: true,
  language: Language.English,
};

export default INITIAL_APP_STATE;
