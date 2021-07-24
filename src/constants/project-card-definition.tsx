import type { CardsProps } from '@awsui/components-react/cards';
import type { ReactElement } from 'react';
import ProjectLink from '../components/project-link';
import type Project from '../types/project';

const mapNameToTo = (name: string): string =>
  `/${name.toLowerCase().replace(/[^a-z]/g, '-')}`;

const PROJECT_CARD_DEFINITION: CardsProps<Project>['cardDefinition'] = {
  header({ icon, name }: Project): ReactElement {
    const to: string = mapNameToTo(name);
    return (
      <ProjectLink icon={icon} to={to}>
        {name}
      </ProjectLink>
    );
  },
};

export default PROJECT_CARD_DEFINITION;
