import {
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import Button from '../../components/button';
import useAsyncState from '../../modules/use-async-state';
import useEffectEvent from '../../hooks/use-effect-event';
import Select from '../../components/select';
import Input from '../../components/input';
import SelectOption from '../../types/select-option';
import Container from '../../components/container/container.view';
import Div from '../../components/div/div.view';
import LoadingIcon from '../../components/loading-icon';

interface BaaiBgeEnV15 {
  readonly text: string | readonly string[];
}

interface HuggingfaceDistilbertSst2Int8Inputs {
  readonly text: string;
}

type Inputs<M extends Model> = M extends
  | Model.TextEmbeddingsBase
  | Model.TextEmbeddingsLarge
  | Model.TextEmbeddingsSmall
  ? BaaiBgeEnV15
  : M extends Model.TextClassification
  ? HuggingfaceDistilbertSst2Int8Inputs
  : M extends Model.TextGeneration
  ? MetaLlama27bChatInt8Inputs
  : M extends Model.Translation
  ? MetaM2m10012bInputs
  : M extends Model.ImageClassification
  ? MicrosoftResnet50Inputs
  : M extends Model.SpeechRecognition
  ? OpenaiWhisperInputs
  : never;

type MetaLlama27bChatInt8Inputs =
  | {
      readonly messages: readonly MetaLlama27bChatInt8Message[];
    }
  | {
      readonly prompt: string;
    };

interface MetaLlama27bChatInt8Message {
  readonly content: string;
  readonly role: 'system' | 'user';
}

interface MetaM2m10012bInputs {
  readonly source_lang: 'en' | 'fr' | 'ja';
  readonly target_lang: 'en' | 'fr' | 'ja';
  readonly text: string;
}

interface MicrosoftResnet50Inputs {
  readonly image: readonly string[];
}

interface OpenaiWhisperInputs {
  readonly audio: readonly string[];
}

interface Props {
  readonly onFetch: <M extends Model>(
    auth: string,
    model: M,
    inputs: Inputs<M>,
  ) => Promise<unknown>;
}

interface State<M extends Model> {
  readonly model: M;
  readonly inputs: Inputs<M>;
}

export enum Model {
  ImageClassification = '@cf/microsoft/resnet-50',
  SpeechRecognition = '@cf/openai/whisper',
  TextClassification = '@cf/huggingface/distilbert-sst-2-int8',
  TextEmbeddingsBase = '@cf/baai/bge-base-en-v1.5',
  TextEmbeddingsLarge = '@cf/baai/bge-large-en-v1.5',
  TextEmbeddingsSmall = '@cf/baai/bge-small-en-v1.5',
  TextGeneration = '@cf/meta/llama-2-7b-chat-int8',
  Translation = '@cf/meta/m2m100-1.2b',
}

enum Language {
  English = 'en',
  French = 'fr',
  Japanese = 'ja',
}

const DEFAULT_MODEL: Model = Model.Translation;
const DEFAULT_STATE: State<Model.Translation> = {
  model: DEFAULT_MODEL,
  inputs: {
    source_lang: Language.English,
    target_lang: Language.French,
    text: '',
  },
};

const isModel = (value: unknown): value is Model =>
  new Set<unknown>(Object.values(Model)).has(value);

const mapModelToInitialInputs = (model: Model): Inputs<typeof model> => {
  switch (model) {
    case Model.ImageClassification:
      return {
        image: [],
      } satisfies Inputs<Model.ImageClassification>;
    case Model.SpeechRecognition:
      return {
        audio: [],
      };
    case Model.TextClassification:
      return {
        text: '',
      };
    case Model.TextEmbeddingsBase:
    case Model.TextEmbeddingsLarge:
    case Model.TextEmbeddingsSmall:
      return {
        text: [],
      };
    case Model.TextGeneration:
      return {
        messages: [],
      };
    case Model.Translation:
      return {
        source_lang: 'en',
        target_lang: 'en',
        text: '',
      };
  }
};

const OPTIONS: readonly SelectOption[] = [
  {
    label: 'Automatic speech recognition',
    value: Model.SpeechRecognition,
  },
  {
    label: 'Embeddings (base)',
    value: Model.TextEmbeddingsBase,
  },
  {
    label: 'Embeddings (large)',
    value: Model.TextEmbeddingsLarge,
  },
  {
    label: 'Embeddings (small)',
    value: Model.TextEmbeddingsSmall,
  },
  {
    label: 'Image classification',
    value: Model.ImageClassification,
  },
  {
    label: 'Large language model (LLM)',
    value: Model.TextGeneration,
  },
  {
    label: 'Speech recognition',
    value: Model.SpeechRecognition,
  },
  {
    label: 'Speech to text',
    value: Model.SpeechRecognition,
  },
  {
    label: 'Text embeddings (base)',
    value: Model.TextEmbeddingsBase,
  },
  {
    label: 'Text embeddings (large)',
    value: Model.TextEmbeddingsLarge,
  },
  {
    label: 'Text embeddings (small)',
    value: Model.TextEmbeddingsSmall,
  },
  {
    label: 'Text generation',
    value: Model.TextGeneration,
  },
  {
    label: 'Translation',
    value: Model.Translation,
  },
];

const isRunnable = (state: State<Model>): boolean => {
  switch (state.model) {
    case Model.ImageClassification:
      // @ts-expect-error Types are hard, but this is right.
      return state.inputs.image.length > 0;
    case Model.SpeechRecognition:
      // @ts-expect-error Types are hard, but this is right.
      return state.inputs.audio.length > 0;
    case Model.TextClassification:
    case Model.TextEmbeddingsBase:
    case Model.TextEmbeddingsLarge:
    case Model.TextEmbeddingsSmall:
    case Model.Translation:
      // @ts-expect-error Types are hard, but this is right.
      return state.inputs.text.length > 0;
    case Model.TextGeneration:
      // @ts-expect-error Types are hard, but this is right.
      return state.inputs.messages.length > 0;
  }
};

const LANGUAGES: readonly SelectOption[] = [
  {
    label: 'English',
    value: Language.English,
  },
  {
    label: 'French',
    value: Language.French,
  },
  {
    label: 'Japanese',
    value: Language.Japanese,
  },
];

const isLanguage = (value: unknown): value is Language =>
  new Set<unknown>(Object.values(Language)).has(value);

function TranslationForm(
  props: Omit<FormProps<Model.Translation>, 'model'>,
): ReactElement {
  return (
    <>
      <Div display="flex" flexDirection="row" justifyContent="space-around">
        <Select
          label="Source language"
          labelDirection="column"
          onChange={useEffectEvent((value: string | undefined): void => {
            if (!isLanguage(value)) {
              throw new Error(
                `Expected a language, but received ${JSON.stringify(value)}.`,
              );
            }
            props.onChange({
              ...props.state.inputs,
              source_lang: value,
            });
          })}
          options={LANGUAGES}
          value={props.state.inputs.source_lang}
        />

        <Select
          label="Target language"
          labelDirection="column"
          onChange={useEffectEvent((value: string | undefined): void => {
            if (!isLanguage(value)) {
              throw new Error(
                `Expected a language, but received ${JSON.stringify(value)}.`,
              );
            }
            props.onChange({
              ...props.state.inputs,
              target_lang: value,
            });
          })}
          options={LANGUAGES}
          value={props.state.inputs.target_lang}
        />
      </Div>
      <Input
        onChange={useEffectEvent((text: string): void => {
          props.onChange({
            ...props.state.inputs,
            text,
          });
        })}
        placeholder="text"
        value={props.state.inputs.text}
      />
    </>
  );
}

interface FormProps<M extends Model> {
  readonly onChange: (inputs: Inputs<M>) => void;
  readonly state: State<M>;
}

function Form<M extends Model>(props: FormProps<M>): ReactElement {
  switch (props.state.model) {
    case Model.Translation:
      return <TranslationForm {...(props as FormProps<Model.Translation>)} />;
    default:
      return <>Oops</>;
  }
}

export default function CloudflareWorkersAiFeature({
  onFetch,
}: Props): ReactElement {
  const [apiToken, setApiToken] = useState('');
  const [state, setState] = useState<State<Model>>(DEFAULT_STATE);

  const { data, error, initiated, loading, request } = useAsyncState();
  const {
    data: verifyTokenData,
    error: verifyTokenError,
    initiated: isVerifyTokenInitiated,
    loading: isVerifyTokenLoading,
    request: requestTokenVerification,
  } = useAsyncState();

  useEffect((): void => {
    if (apiToken === '') {
      return;
    }

    requestTokenVerification(async (): Promise<unknown> => {
      const response: Response = await window.fetch(
        'https://api.cloudflare.com/client/v4/user/tokens/verify',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return await response.json();
    });
  }, [apiToken]);

  const asyncRunEffect: MutableRefObject<Promise<unknown> | undefined> =
    useRef();

  const handleRunClick = useEffectEvent((): void => {
    if (!isRunnable(state)) {
      return;
    }

    asyncRunEffect.current = request(
      async (): Promise<unknown> =>
        await onFetch(apiToken, state.model, state.inputs),
    );
  });

  const handleModelChange = useEffectEvent(
    (model: string = Model.ImageClassification): void => {
      if (!isModel(model)) {
        throw new Error(`Expected a model, but received ${model}.`);
      }

      setState({
        inputs: mapModelToInitialInputs(model),
        model,
      });
    },
  );

  const handleFormChange = useEffectEvent(
    (inputs: (typeof state)['inputs']): void => {
      setState((oldState: typeof state): typeof state => ({
        ...oldState,
        inputs,
      }));
    },
  );

  return (
    <Container
      header="Cloudflare Workers AI"
      actions={
        <Button
          category="app-components/cloudflare-workers-ai"
          onClick={handleRunClick}
          variant="primary"
        >
          Run
        </Button>
      }
      subheader={
        <Div display="flex" flexDirection="row" justifyContent="space-around">
          <Div>
            <Input
              onChange={setApiToken}
              placeholder="Cloudflare API token"
              type="password"
              value={apiToken}
            />
            {isVerifyTokenInitiated ? (
              isVerifyTokenLoading ? (
                <LoadingIcon />
              ) : typeof verifyTokenError === 'string' ? (
                <>❌ {verifyTokenError}</>
              ) : (
                <>✔ {JSON.stringify(verifyTokenData)}</>
              )
            ) : (
              <>✖</>
            )}
          </Div>
          <Select
            label="Select a model"
            labelDirection="column"
            onChange={handleModelChange}
            options={OPTIONS}
            value={state.model}
          />
        </Div>
      }
    >
      {initiated && <>Initiated</>}
      {loading && <LoadingIcon />}
      {error && <>{JSON.stringify(error)}</>}
      <Form onChange={handleFormChange} state={state} />
      <Div>
        <h3>Response</h3>
        <textarea disabled>{JSON.stringify(data, null, 2)}</textarea>
      </Div>
    </Container>
  );
}
