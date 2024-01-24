import { type Attributes } from 'react';
import type Project from '../../../types/project.js';

export default function mapProjectToAttributes(
  project: Project,
): Project & Required<Attributes> {
  return {
    ...project,
    key: project.name,
  };
}
