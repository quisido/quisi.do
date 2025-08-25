/**
 *   Since `HostContext` is `unknown` in `react-reconciler`, we cannot use
 * `implements HostContext`.
 *   A class can only implement an object type or intersection of object types
 * with statically known members. ts(2422)
 */

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class QuisidoHostContext {}
