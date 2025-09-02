import type Instance from './instance.js';

/**
 *   Given a union of family members `Audio | Image`, this utility type extracts
 * the family member that corresponds to the specified type `T`.
 */

export type FamilyMember<
  Type extends string,
  Props extends Record<Type, object>,
  Txt,
  Family extends Instance<Type, Props, Txt, Family>,
  T extends Type,
> = Family extends Instance<Type, Props, Txt, Family, T> ? Family : never;
