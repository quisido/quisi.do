import { PropsWithChildren, ReactElement } from "react";
import FullstoryAPIContext from "../../../contexts/fullstory-api";
import useShallowMemo from "../../../hooks/use-shallow-memo";
import FullStoryAPIType from "../../../types/fullstory-api";

export default function FullStoryAPIProvider({children, ...api}: Readonly<PropsWithChildren<FullStoryAPIType>>): ReactElement {
  const memoizedApi: FullStoryAPIType = useShallowMemo(api);
  return <FullstoryAPIContext.Provider value={memoizedApi}>{children}</FullstoryAPIContext.Provider>;
}
