/// <reference types="../worker-configuration.d.ts" />
import mapStringToListItem from './map-string-to-list-item.js';
import { Role } from './role.js';

interface Options {
  readonly data: string;
  readonly dataType: 'json';
  readonly goal: string;
  readonly hasTools: boolean;
}

const GLOBAL_CONSTRAINTS: readonly string[] = ['DO NOT output JSON.'];

export default class TaskMessage implements RoleScopedChatInput {
  public readonly content: string;
  public readonly role: Role.User = Role.User;

  public constructor({ data, dataType, goal, hasTools }: Options) {
    const constraints: string[] = [...GLOBAL_CONSTRAINTS];

    if (!hasTools) {
      constraints.push('DO NOT attempt to use tools.');
    }

    this.content = `
# Report

## Data

\`\`\`${dataType}
${data}
\`\`\`

## Goal

${goal}

# Constraints

${constraints.map(mapStringToListItem).join(`
`)}
`.trim();
  }
}
