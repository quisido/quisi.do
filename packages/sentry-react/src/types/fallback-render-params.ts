export default interface FallbackRenderParams {
  readonly componentStack: string | null;
  readonly error: Readonly<Error>;
  readonly eventId: string | null;
  readonly resetError: () => void;
}
