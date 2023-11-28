import { type Attributes } from 'react';

export default interface TestItem extends Attributes {
  readonly description?: string | undefined;
  readonly value: string;
}
