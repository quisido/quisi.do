/// <reference types="@types/trusted-types" />
import DOMPurify from 'dompurify';
import { identity } from 'fmrs';

if (typeof window.trustedTypes !== 'undefined') {
  window.trustedTypes.createPolicy('quisido', {
    createHTML: DOMPurify.sanitize.bind(DOMPurify),
    createScript: identity,
    createScriptURL: identity,
  });
}
