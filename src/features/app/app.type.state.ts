import type DesignSystem from '../../constants/design-system';
import type Language from '../../constants/language';

export default interface AppState {
  readonly designSystem: DesignSystem;
  readonly isDarkModeEnabled: boolean;
  readonly language: Language;
}
