import type { UserVars } from '@fullstory/browser';

export default interface IdentifyProps {
  readonly userUid?: number | string | undefined;
  readonly userVars?: UserVars | undefined;
}
