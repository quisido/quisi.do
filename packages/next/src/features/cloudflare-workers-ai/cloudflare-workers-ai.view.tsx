import { type ReactElement } from 'react';
import Section from '../../components/section.js';
// import Div from '../../components/div/index.js';
// import useCloudflareWorkersAi from './cloudflare-workers-ai.hook.js';
// import Actions from './components/actions.js';
// import Form from './components/form.js';
// import Subheader from './components/subheader.js';
// import type Fetch from './types/fetch.js';
// import handleSubmit from './utils/handle-submit.js';

/*
interface Props {
  readonly onFetch: Fetch;
}
*/

export default function CloudflareWorkersAiFeature(): ReactElement {
  /*
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
    <form action="#" method="POST" onSubmit={handleSubmit}>
      <Section
        actions={<Actions onRunClick={handleRunClick} />}
        header="Cloudflare Workers AI"
      >
          <Subheader
            apiToken={apiToken}
            apiTokenStatus={apiTokenStatus}
            onApiTokenChange={handleApiTokenChange}
            onModelChange={handleModelChange}
            model={model}
          />
        {initiated && <>Initiated</>}
        {loading && <LoadingIcon />}
        {error && <>{JSON.stringify(error)}</>}
        <Form inputs={inputs} model={model} onChange={handleFormChange} />
        <Div>
          <h3>Response</h3>
          <textarea disabled>{result}</textarea>
        </Div>
      </Container>
    </form>
  );
  */
  return (
    <Section header="Cloudflare Workers AI">
      This page may or may not exist. 🤔
    </Section>
  );
}
