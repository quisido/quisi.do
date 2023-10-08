import { ReactElement } from 'react';
import Model from '../../constants/model';
import ModelState from '../../types/model-state';
import TranslationForm from '../translation-form';
import { MetaM2m10012b } from '../../types/inputs';

/**
 * Technical debt:
 * TypeScript should be able to infer the type of `inputs` after
 *   `switch`/`case`ing the `model`. If I can find out how to correctly infer
 *   the type of `inputs`, then I can remove all uses of `as` in this file.
 */

interface Props<S extends ModelState> {
  readonly inputs: S['inputs'];
  readonly model: S['model'];
  readonly onChange: (inputs: S['inputs']) => void;
}

export default function CloudflareWorkersAiForm<S extends ModelState>({
  inputs,
  model,
  onChange,
}: Props<S>): ReactElement {
  switch (model) {
    case Model.Translation:
      return (
        <TranslationForm inputs={inputs as MetaM2m10012b} onChange={onChange} />
      );

    default:
      return (
        <>
          The <strong>{model.replace(/^@cf\//, '')}</strong> Cloudflare Workers
          AI model is not yet supported. 😟
        </>
      );
  }
}
