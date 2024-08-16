import unimplementedMethod from "./unimplemented-method.js";

export default class TestD1Database implements D1Database {
  public batch: D1Database['batch'];
  public dump: D1Database['dump'];
  public exec: D1Database['exec'];
  public prepare: D1Database['prepare'];

  public constructor({
    prepare = unimplementedMethod,
    dump = unimplementedMethod,
    batch = unimplementedMethod,
    exec = unimplementedMethod,
  }: Partial<D1Database> = {}) {
    this.batch = batch;
    this.dump = dump;
    this.exec = exec;
    this.prepare = prepare;
  }
}
