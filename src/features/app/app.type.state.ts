import type Language from '../../constants/language';

export default interface AppState {
  readonly isDarkModeEnabled: boolean;
  readonly language: Language;
}
