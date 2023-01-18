export default interface User extends Readonly<Record<string, unknown>> {
  readonly email?: string | undefined;
  readonly id?: string | undefined;
  readonly name?: string | undefined;
}
