import Button from '@awsui/components-react/button';
import I18n from 'lazy-i18n';
import { ReactElement } from 'react';
import useViewResumeButton from './view-resume-button.hook';

const RESUME_HREF = '/resume/2019-11/charles-stover-resume.pdf';

export default function ViewResumeButton(): ReactElement {
  const { iconAlt } = useViewResumeButton();

  return (
    <Button
      href={RESUME_HREF}
      iconAlign="right"
      iconAlt={iconAlt}
      iconName="external"
      target="_blank"
      variant="primary"
    >
      <I18n>View résumé</I18n>
    </Button>
  );
}
