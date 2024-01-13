import { type ReactElement } from 'react';
import Select from '../../../../components/select/index.js';
import Input from '../../../../components/input/index.js';
import ApiTokenStatus from '../api-token-status.js';
import Div from '../../../../components/div/index.js';
import type IApiTokenStatus from '../../types/api-token-status.js';
import useSubheader from './subheader.hook.js';
import type Model from '../../constants/model.js';

interface Props {
  readonly apiToken: string;
  readonly apiTokenStatus: IApiTokenStatus;
  readonly onApiTokenChange: (token: string) => void;
  readonly onModelChange: (model: Model) => void;
  readonly model: Model;
}

const API_TOKEN_AUTO_COMPLETE: Set<AutoFill> = new Set(['one-time-code']);

export default function Subheader({
  apiToken,
  apiTokenStatus,
  onApiTokenChange,
  onModelChange,
  model,
}: Props): ReactElement {
  const { handleModelChange, modelLabel, modelOptions } = useSubheader({
    onModelChange,
  });

  return (
    <Div display="flex" flexDirection="row" justifyContent="space-around">
      <Div alignItems="center" display="flex" flexDirection="row">
        <Input
          autoComplete={API_TOKEN_AUTO_COMPLETE}
          onChange={onApiTokenChange}
          placeholder="Cloudflare API token"
          type="password"
          value={apiToken}
        />
        <ApiTokenStatus>{apiTokenStatus}</ApiTokenStatus>
      </Div>
      <Select
        label={modelLabel}
        labelDirection="column"
        onChange={handleModelChange}
        options={modelOptions}
        value={model}
      />
    </Div>
  );
}
