interface State {
  done: boolean;
  value: string;
}

export default async function mapReadableStreamToString(
  stream: ReadableStream,
): Promise<string> {
  /**
   *   Technical debt: I could not create an `ArrayBuffer` type guard that
   * includes `Uint8Array`. 🙁
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const reader: ReadableStreamDefaultReader<ArrayBuffer> = stream.getReader();

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
