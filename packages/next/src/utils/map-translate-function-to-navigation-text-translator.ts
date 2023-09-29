import type { TranslateFunction } from 'lazy-i18n';
import NavigationText from '../constants/navigation-text';

export default function mapTranslateFunctionToNavigationTextTranslator(
  translate: TranslateFunction,
): (text: NavigationText) => string | undefined {
  return function mapNavigationTextToTranslation(
    text: NavigationText,
  ): string | undefined {
    switch (text) {
      case NavigationText.AceAlters:
        return 'AceAlters.com';
      case NavigationText.Applications:
        return translate('Applications');
      case NavigationText.Bluesky:
        return 'Bluesky';
      case NavigationText.ConnectWithMe:
        return translate('Connect with me');
      case NavigationText.Dashboard:
        return translate('Dashboard');
      case NavigationText.Dota2Huds:
        return 'Dota 2 HUDs';
      case NavigationText.GitHub:
        return 'GitHub';
      case NavigationText.Home:
        return translate('Home');
      case NavigationText.LinkedIn:
        return 'LinkedIn';
      case NavigationText.MTGPlanechase:
        return 'MTG Planechase';
      case NavigationText.Medium:
        return 'Medium';
      case NavigationText.MoreApplications:
        return translate('More applications');
      case NavigationText.Packages:
        return translate('Packages');
      case NavigationText.Portfolio:
        return translate('Portfolio');
      case NavigationText.Publications:
        return translate('Publications');
      case NavigationText.Quisido:
        return 'Quisido.com';
      case NavigationText.Quotes:
        return translate('Quotes');
      case NavigationText.RPGOverworldEngine:
        return translate('RPG overworld engine');
      case NavigationText.Settings:
        return translate('Settings');
      case NavigationText.SpriteSheet2Gif:
        return 'Sprite sheet to GIF';
      case NavigationText.Tetris3DS:
        return '3DS Tetris';
      case NavigationText.Threads:
        return 'Threads';
      case NavigationText.Twitter:
        return 'Twitter';
    }
  };
}
