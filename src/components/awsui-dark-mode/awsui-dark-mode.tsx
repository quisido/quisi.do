import { ReactElement, ReactNode } from 'react';
import AwsuiTheme from '../../components/awsui-theme';

interface Props {
  children?: ReactNode;
}

const BLACK = '#000000';
const BLUE_400 = '#44b9d6';
const BLUE_500 = '#00a1c9';
const BLUE_600 = '#0073bb';
const BLUE_900 = '#12293b';
const GRAY_100 = '#fafafa';
const GRAY_200 = '#eaeded';
const GRAY_300 = '#d5dbdb';
const GRAY_450 = '#95a5a6';
const GRAY_500 = '#879596';
const GRAY_550 = '#687078';
const GRAY_650 = '#414750';
const GRAY_700 = '#2a2e33';
const GRAY_750 = '#21252c';
const GRAY_800 = '#1a2029';
const GRAY_900 = '#16191f';
const GREEN_500 = '#6aaf35';
const GREEN_600 = '#1d8102';
const GREEN_900 = '#172211';
const RED_500 = '#ff5d64';
const RED_600 = '#d13212';
const RED_900 = '#270a11';
const WHITE = '#ffffff';

export default function AwsuiDarkMode({ children }: Props): ReactElement {
  return (
    <AwsuiTheme
      backgroundButtonNormalActive={GRAY_650}
      backgroundButtonNormalDefault={GRAY_800}
      backgroundButtonNormalHover={GRAY_750}
      backgroundContainerContent={GRAY_700}
      backgroundContainerHeader={GRAY_750}
      backgroundControlChecked={BLUE_500}
      backgroundControlDefault={GRAY_800}
      backgroundControlDisabled={GRAY_650}
      backgroundDropdownItemDefault={GRAY_700}
      backgroundDropdownItemFilterMatch={BLUE_900}
      backgroundDropdownItemHover={GRAY_650}
      backgroundDropdownItemSelected={BLUE_900}
      backgroundHomeHeader={BLACK}
      backgroundInputDefault={GRAY_800}
      backgroundInputDisabled={GRAY_650}
      backgroundItemSelected={BLUE_900}
      backgroundLayoutMain={GRAY_900}
      backgroundLayoutPanelContent={GRAY_700}
      backgroundLayoutPanelHover={GRAY_700}
      backgroundNotificationBlue={BLUE_600}
      backgroundNotificationGreen={GREEN_600}
      backgroundNotificationRed={RED_600}
      backgroundStatusError={RED_900}
      backgroundStatusInfo={BLUE_900}
      backgroundStatusSuccess={GREEN_900}
      backgroundStatusWarning={GRAY_700}
      borderButtonNormalDefault={GRAY_300}
      borderButtonNormalHover={GRAY_100}
      borderContainerTop={GRAY_700}
      borderControlDefault={GRAY_500}
      borderDividerDefault={GRAY_650}
      borderDropdownItemHover={GRAY_500}
      borderInputDefault={GRAY_500}
      borderItemFocused={BLUE_500}
      borderItemSelected={BLUE_500}
      borderLayout={GRAY_650}
      borderStatusError={RED_600}
      borderStatusInfo={BLUE_500}
      borderStatusSuccess={GREEN_600}
      borderStatusWarning={GRAY_500}
      foregroundControlDefault={WHITE}
      foregroundControlDisabled={GRAY_550}
      textAccent={BLUE_400}
      textBodyDefault={GRAY_300}
      textBodySecondary={GRAY_300}
      textBreadcrumb={GRAY_450}
      textColumnHeader={GRAY_300}
      textDropdownItemDefault={GRAY_200}
      textDropdownItemFilterMatch={BLUE_400}
      textDropdownItemHighlighted={GRAY_200}
      textEmpty={GRAY_300}
      textFormDefault={GRAY_300}
      textFormLabel={GRAY_300}
      textFormSecondary={GRAY_450}
      textHeadingDefault={GRAY_200}
      textHeadingSecondary={GRAY_300}
      textHomeHeaderDefault={GRAY_200}
      textHomeHeaderSecondary={GRAY_300}
      textIconCaret={GRAY_300}
      textInputDisabled={GRAY_550}
      textInputPlaceholder={GRAY_550}
      textInteractiveActive={GRAY_100}
      textInteractiveDefault={GRAY_300}
      textInteractiveDisabled={GRAY_550}
      textInteractiveHover={GRAY_100}
      textLabel={GRAY_450}
      textLinkDefault={BLUE_400}
      textNotificationDefault={GRAY_100}
      textStatusError={RED_500}
      textStatusInactive={GRAY_450}
      textStatusInfo={BLUE_400}
      textStatusSuccess={GREEN_500}
    >
      {children}
    </AwsuiTheme>
  );
}
