import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import NavigationText from '../../constants/navigation-text';

interface Props {
  readonly children: NavigationText;
}

export default function WrapperNavigationText({
  children,
}: Readonly<Props>): ReactElement {
  switch (children) {
    case NavigationText.AceAlters:
      return <>AceAlters.com</>;
    case NavigationText.Applications:
      return <I18n>Applications</I18n>;
    case NavigationText.ConnectWithMe:
      return <I18n>Connect with me</I18n>;
    case NavigationText.Dashboard:
      return <I18n>Dashboard</I18n>;
    case NavigationText.Dota2Huds:
      return <>Dota 2 HUDs</>;
    case NavigationText.GitHub:
      return <>GitHub</>;
    case NavigationText.Home:
      return <I18n>Home</I18n>;
    case NavigationText.LinkedIn:
      return <>LinkedIn</>;
    case NavigationText.MTGPlanechase:
      return <>MTG Planechase</>;
    case NavigationText.Medium:
      return <>Medium</>;
    case NavigationText.MoreApplications:
      return <I18n>More applications</I18n>;
    case NavigationText.Packages:
      return <I18n>Packages</I18n>;
    case NavigationText.Portfolio:
      return <I18n>Portfolio</I18n>;
    case NavigationText.Publications:
      return <I18n>Publications</I18n>;
    case NavigationText.Quisido:
      return <>Quisido.com</>;
    case NavigationText.Quotes:
      return <I18n>Quotes</I18n>;
    case NavigationText.RPGOverworldEngine:
      return <I18n>RPG overworld engine</I18n>;
    case NavigationText.Settings:
      return <I18n>Settings</I18n>;
    case NavigationText.SpriteSheet2Gif:
      return <>Sprite sheet to GIF</>;
    case NavigationText.Tetris3DS:
      return <>3DS Tetris</>;
    case NavigationText.Twitter:
      return <>Twitter</>;
  }
}
