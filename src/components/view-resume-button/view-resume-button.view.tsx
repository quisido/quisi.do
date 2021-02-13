import Button from '@awsui/components-react/button';
import { ReactElement } from 'react';

const RESUME_HREF = '/resume/2019-11/charles-stover-resume.pdf';

export default function ViewResumeButton(): ReactElement {
  return (
    <Button
      href={RESUME_HREF}
      iconAlign="right"
      iconAlt="external"
      iconName="external"
      target="_blank"
      variant="primary"
    >
      View resum&eacute;
    </Button>
  );
}
