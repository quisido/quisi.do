export default interface FallbackRenderParams {
  readonly componentStack: string | null;
  readonly error: unknown;
  readonly eventId: string | null;
  readonly resetError: () => void;
}
