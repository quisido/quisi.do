import type { PropsWithChildren, ReactElement } from 'react';
import FullstoryAPIContext from '../../../contexts/fullstory-api.js';
import useShallowMemo from '../../../hooks/use-shallow-memo.js';
import type FullStoryAPIType from '../../../types/fullstory-api.js';

export default function FullStoryAPIProvider({
  children,
  ...api
}: Readonly<PropsWithChildren<FullStoryAPIType>>): ReactElement {
  const memoizedApi: FullStoryAPIType = useShallowMemo(api);
  return (
    <FullstoryAPIContext.Provider value={memoizedApi}>
      {children}
    </FullstoryAPIContext.Provider>
  );
}
