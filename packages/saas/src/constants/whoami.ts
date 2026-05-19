import validateString from '../utils/validate-string.js';

export const WHOAMI: string = validateString(import.meta.env.WHOAMI);
