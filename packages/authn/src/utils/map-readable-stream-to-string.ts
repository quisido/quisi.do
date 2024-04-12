interface State {
  done: boolean;
  value: string;
}

export default async function mapReadableStreamToString<
  T extends ArrayBuffer | ArrayBufferView,
>(stream: ReadableStream<T>): Promise<string> {
  const reader: ReadableStreamDefaultReader<T> = stream.getReader();

  const state: State = {
    done: false,
    value: '',
  };

  do {
    const { done, value } = await reader.read();
    if (typeof value !== 'undefined') {
      state.value += new TextDecoder().decode(value);
    }

    state.done = done;
  } while (!state.done);

  return state.value;
}
