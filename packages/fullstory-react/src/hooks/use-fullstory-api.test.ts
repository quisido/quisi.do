import { anonymize, identify, init, shutdown } from "@fullstory/browser";
import { renderHook } from "@testing-library/react-hooks";
import useFullStoryAPI from "./use-fullstory-api";

describe('useFullStoryAPI', (): void => {
  it('should return the FullStory browser API by default', (): void => {
    const { result } = renderHook(useFullStoryAPI);

    expect(result.current).toStrictEqual({
      anonymize,
      identify,
      init,
      shutdown,
    });
  });
});
