import { expect } from 'vitest';

export const EXPECT_ANY_HEADERS: Headers = expect.any(Headers) as Headers;

export const EXPECT_ANY_NUMBER: number = expect.any(Number) as number;

export const EXPECT_ANY_OBJECT: object = expect.any(Object) as object;

export const EXPECT_ANY_STRING: string = expect.any(String) as string;
