import * as fullStoryBrowser from '@fullstory/browser';
import type {
  ApiV2,
  V2Operation,
  V2OperationOptions,
  V2OperationReturnTypes,
} from '@fullstory/snippet';
import capitalize from './capitalize.js';

// Level 1
type MapV2OperationToAsyncHandler<Op extends V2Operation> = (
  options?: V2OperationOptions[Op],
  source?: string,
) => Promise<V2OperationReturnTypes[Op]>;

type MapV2OperationToHandler<Op extends V2Operation> = (
  options?: V2OperationOptions[Op],
  source?: string,
) => V2OperationReturnTypes[Op];

type MapV2OperationToHandlerName<Op extends V2Operation> =
  `on${Capitalize<Op>}`;

// Level 2
type MapV2OperationToAsyncHandlerName<Op extends V2Operation> =
  `${MapV2OperationToHandlerName<Op>}Async`;

type V2OperationHandlerName = {
  [K in V2Operation]: MapV2OperationToHandlerName<K>;
}[V2Operation];

// Level 3
type V2AsyncOperationHandlerName = {
  [Op in V2Operation]: MapV2OperationToAsyncHandlerName<Op>;
}[V2Operation];

type MapV2OperationHandlerNameToOperation<K extends V2OperationHandlerName> =
  K extends MapV2OperationToHandlerName<infer Op> ? Op : never;

// Level 4
type MapV2AsyncOperationHandlerNameToOperation<
  K extends V2AsyncOperationHandlerName,
> = K extends MapV2OperationToAsyncHandlerName<infer Op> ? Op : never;

type MapV2OperationHandlerNameToHandler<K extends V2OperationHandlerName> =
  MapV2OperationToHandler<MapV2OperationHandlerNameToOperation<K>>;

// Level 5
type MapV2AsyncOperationHandlerNameToHandler<
  K extends V2AsyncOperationHandlerName,
> = MapV2OperationToAsyncHandler<MapV2AsyncOperationHandlerNameToOperation<K>>;

export type V2OperationHandlers = {
  [K in V2OperationHandlerName]: MapV2OperationHandlerNameToHandler<K>;
};

// Level 6
export type V2AsyncOperationHandlers = {
  [K in V2AsyncOperationHandlerName]: MapV2AsyncOperationHandlerNameToHandler<K>;
};

export default function mapV2OperationHandlersToApi({
  FullStory = fullStoryBrowser.FullStory,
  ...handlers
}: Partial<
  Pick<typeof fullStoryBrowser, 'FullStory'> &
    V2AsyncOperationHandlers &
    V2OperationHandlers
>): Omit<ApiV2, keyof ApiV2> {
  function MockFullStory<Op extends V2Operation>(
    operation: Op,
    options?: V2OperationOptions[Op],
    source?: string,
  ): V2OperationReturnTypes[Op];
  function MockFullStory<Op extends V2Operation>(
    operation: `${Op}Async`,
    options?: V2OperationOptions[Op],
    source?: string,
  ): V2OperationReturnTypes[Op];
  function MockFullStory<Op extends V2Operation>(
    operation: Op | `${Op}Async`,
    options?: V2OperationOptions[Op],
    source?: string,
  ): Promise<V2OperationReturnTypes[Op]> | V2OperationReturnTypes[Op] {
    const handlerName:
      | MapV2OperationToAsyncHandlerName<Op>
      | MapV2OperationToHandlerName<Op> = `on${capitalize(operation)}`;

    /**
     * Type 'MapV2AsyncOperationHandlerNameToHandler<"onTrackEventAsync"> |
     * MapV2AsyncOperationHandlerNameToHandler<"onGetSessionAsync"> | ... 26
     * more ...' is not assignable to type 'MapV2OperationToAsyncHandler<Op> |
     * MapV2OperationToHandler<Op>'.
     */
    const handler:
      | MapV2OperationToAsyncHandler<Op>
      | MapV2OperationToHandler<Op>
      | undefined = handlers[handlerName] as
      | MapV2OperationToAsyncHandler<Op>
      | MapV2OperationToHandler<Op>
      | undefined;
    if (typeof handler !== 'undefined') {
      return handler(options, source);
    }

    /**
     * Type 'Promise<V2OperationReturnTypes[`${Op}`]>' is not assignable to type
     * 'V2OperationReturnTypes[Op] | Promise<V2OperationReturnTypes[Op]>'.
     */
    return FullStory(operation as Op, options, source);
  }

  return MockFullStory;
}
