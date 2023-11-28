import type Project from '../../types/project.js';
import type { WithKey } from '../../types/with-key.js';

export default function mapProjectToAttributes(
  project: Project,
): WithKey<Project> {
  return {
    ...project,
    key: project.name,
  };
}
