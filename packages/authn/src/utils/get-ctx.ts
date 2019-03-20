import getState from './get-state.js';

export default function getCtx(): ExecutionContext {
  const { ctx } = getState();
  return ctx;
}
