import { describe, expect, it } from "vitest";
import { throwy } from "../../test/throwy.js";
import { toFixable } from "./to-fixable.js";

describe(toFixable, (): void => {

  it("supports rules without meta", (): void => {

    expect(toFixable({
      "ruleId": {
        "create": throwy,
      },
    })).toEqual({});

  });

});
