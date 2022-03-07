import { Frame, TitleBar } from '@react95/core';
import type { ReactElement } from 'react';
import type Props from './types/props';

export default function AwsContainer({
  actions,
  children,
  footer,
  header,
  headerClassName,
}: Readonly<Props>): ReactElement {
  return (
    <Frame>
      <TitleBar className={headerClassName} title={header as unknown as string}>
        <TitleBar.OptionsBox>{actions}</TitleBar.OptionsBox>
      </TitleBar>
      {children}
      {footer}
    </Frame>
  );
}
