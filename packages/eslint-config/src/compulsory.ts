export type Compulsory<T> = T extends infer U | undefined ? U : T;
