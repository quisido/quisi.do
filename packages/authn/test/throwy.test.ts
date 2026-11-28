import { describe, it, expect } from "vitest";
import { throwy } from "./throwy.js";

describe(throwy, (): void => {

  it("throws", (): void => {

    expect(throwy).toThrow(Error);

  });

});
