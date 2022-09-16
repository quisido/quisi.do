import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Button from '../../../../components/button';
import RESUME_HREF from '../../../../constants/resume-href';

export default function ViewResumeButton(): ReactElement {
  return (
    <Button
      category="features/home/view-resume-button"
      href={RESUME_HREF}
      variant="primary"
    >
      <I18n>View résumé</I18n>
    </Button>
  );
}
