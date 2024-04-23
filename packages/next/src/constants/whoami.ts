import validateString from "../utils/validate-string.js";

export const WHOAMI: string = validateString(process.env['WHOAMI']);
