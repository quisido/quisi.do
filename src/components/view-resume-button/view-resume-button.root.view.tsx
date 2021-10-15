import type { ButtonProps } from '@awsui/components-react/button';
import Button from '@awsui/components-react/button';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import useViewResumeButton from './view-resume-button.root.hook';

const RESUME_HREF = '/resume/2021-07/charles-stover-resume.pdf';

export default function ViewResumeButton(): ReactElement {
  const { iconAlt } = useViewResumeButton();

  // Workaround until AWS UI supports TypeScript 4.4 exact optional properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const optionalProps: Pick<ButtonProps, 'iconAlt'> = {};
  if (typeof iconAlt !== 'undefined') {
    optionalProps.iconAlt = iconAlt;
  }

  return (
    <Button
      href={RESUME_HREF}
      iconAlign="right"
      iconName="external"
      target="_blank"
      variant="primary"
      {...optionalProps}
    >
      <I18n>View résumé</I18n>
    </Button>
  );
}
