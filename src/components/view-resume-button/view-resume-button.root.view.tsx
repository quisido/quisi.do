import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Button from '../../components/button';

const RESUME_HREF = '/resume/2021-07/charles-stover-resume.pdf';

export default function ViewResumeButton(): ReactElement {
  return (
    <Button href={RESUME_HREF} variant="primary">
      <I18n>View résumé</I18n>
    </Button>
  );
}
