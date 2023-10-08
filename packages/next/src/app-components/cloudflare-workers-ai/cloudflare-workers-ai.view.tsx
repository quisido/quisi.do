import { type ReactElement } from 'react';
import Container from '../../components/container/container.view';
import Div from '../../components/div/div.view';
import useCloudflareWorkersAi from './cloudflare-workers-ai.hook';
import Actions from './components/actions';
import Form from './components/form';
import Subheader from './components/subheader';
import Fetch from './types/fetch';

interface Props {
  readonly onFetch: Fetch;
}

export default function CloudflareWorkersAiFeature({
  onFetch,
}: Props): ReactElement {
  const {
    apiToken,
    apiTokenStatus,
    handleApiTokenChange,
    handleFormChange,
    handleModelChange,
    handleRunClick,
    inputs,
    model,
    result,
  } = useCloudflareWorkersAi(onFetch);

  return (
    <Container
      actions={<Actions onRunClick={handleRunClick} />}
      header="Cloudflare Workers AI"
      subheader={
        <Subheader
          apiToken={apiToken}
          apiTokenStatus={apiTokenStatus}
          onApiTokenChange={handleApiTokenChange}
          onModelChange={handleModelChange}
          model={model}
        />
      }
    >
      {/*
      {initiated && <>Initiated</>}
      {loading && <LoadingIcon />}
      {error && <>{JSON.stringify(error)}</>}
      */}
      <Form inputs={inputs} model={model} onChange={handleFormChange} />
      <Div>
        <h3>Response</h3>
        <textarea disabled>{result}</textarea>
      </Div>
    </Container>
  );
}
