declare module '@monogatari/core' {
  export interface MonogatariLike {
    assets(type: string, object: Record<string, string>): void;
    characters(object: object): void;
    init(selector?: string): Promise<unknown>;
    script(object: object): void;
    settings(object: object): void;
    storage(object: object): void;
    storage(): unknown;
  }

  const monogatari: MonogatariLike;

  export default monogatari;
}
