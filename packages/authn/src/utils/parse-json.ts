import StatusCode from '../constants/status-code.js';
import createError from './create-error.js';

export default function parseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch (err: unknown) {
    throw createError('Expected JSON.', StatusCode.BadRequest, value);
  }
}
