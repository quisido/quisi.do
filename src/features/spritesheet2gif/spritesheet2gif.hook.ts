import type { AppLayoutProps } from '@awsui/components-react/app-layout';
import type { FlashbarProps } from '@awsui/components-react/flashbar';
import type { InputProps } from '@awsui/components-react/input';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { SelectProps } from '@awsui/components-react/select';
import type { ChangeEvent, ComponentType, MutableRefObject } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import type ReadonlySelectChangeEvent from '../../types/readonly-select-change-event';
import AutomaticDimensionInfo from './components/automatic-dimension-info';
import AutomaticDirectionInfo from './components/automatic-direction-info';
import HeaderInfo from './components/header-info';
import MatteInfo from './components/matte-info';
import Direction from './constants/direction';

interface ApiErrorResponse {
  readonly message: string;
}

interface ApiGifResponse {
  readonly height: number;
  readonly image: string;
  readonly width: number;
}

interface State {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly Tools: ComponentType<unknown>;
  readonly apiGifResponse: ApiGifResponse | null;
  readonly asyncConvertEffect: MutableRefObject<Promise<Response> | null>;
  readonly dimension: string;
  readonly dimensionDescription: string;
  readonly dimensionLabel: string;
  readonly directionOptions: SelectProps.Options;
  readonly duration: string;
  readonly handleConvertClick: () => void;
  readonly handleDimensionInfoFollow: () => void;
  readonly handleDirectionInfoFollow: () => void;
  readonly handleHeaderInfoFollow: () => void;
  readonly handleMatteInfoFollow: () => void;
  readonly isConvertButtonLoading: boolean;
  readonly isDimensionInfo: boolean;
  readonly isDirectionInfo: boolean;
  readonly matte: string;
  readonly notifications: FlashbarProps.MessageDefinition[];
  readonly perFrameOptions: SelectProps.Options;
  readonly selectedDirectionOption: SelectProps.Option;
  readonly selectedPerFrameOption: SelectProps.Option;
  readonly toolsOpen: boolean;
  readonly handleDimensionChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<InputProps.ChangeDetail>>
    >,
  ) => void;
  readonly handleDirectionChange: (event: ReadonlySelectChangeEvent) => void;
  readonly handleDurationChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<InputProps.ChangeDetail>>
    >,
  ) => void;
  readonly handleMatteChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<InputProps.ChangeDetail>>
    >,
  ) => void;
  readonly handlePerFrameChange: (event: ReadonlySelectChangeEvent) => void;
  readonly handleSpriteSheetImageFileChange: (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  readonly handleToolsChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<AppLayoutProps.ChangeDetail>>
    >,
  ) => void;
}

const DEFAULT_DIMENSION = 0;
const DEFAULT_DURATION = 80;
const FIRST = 0;
const ZERO = 0;

const getDefaultTools = (): ComponentType<unknown> => HeaderInfo;

const isApiErrorResponse = (value: unknown): value is ApiErrorResponse =>
  typeof value === 'object' &&
  value !== null &&
  Object.prototype.hasOwnProperty.call(value, 'message');

const isApiGifResponse = (value: unknown): value is ApiGifResponse =>
  typeof value === 'object' &&
  value !== null &&
  Object.prototype.hasOwnProperty.call(value, 'height') &&
  Object.prototype.hasOwnProperty.call(value, 'image') &&
  Object.prototype.hasOwnProperty.call(value, 'width');

const DIRECTION_OPTIONS: SelectProps.Options = [
  {
    label: 'Automatic',
    value: Direction.Automatic,
  },
  {
    label: 'Horizontal',
    value: Direction.Horizontal,
  },
  {
    label: 'Vertical',
    value: Direction.Vertical,
  },
];

const PER_FRAME_OPTIONS: SelectProps.Options = [
  {
    label: 'total',
    value: 'false',
  },
  {
    label: 'per frame',
    value: 'true',
  },
];

export default function useSpriteSheet2Gif(): State {
  const asyncConvertEffect: MutableRefObject<Promise<Response> | null> =
    useRef(null);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [Tools, setTools] = useState(getDefaultTools);
  const [apiGifResponse, setApiGifResponse] = useState<ApiGifResponse | null>(
    null,
  );
  const [dimension, setDimension] = useState(DEFAULT_DIMENSION);
  const [direction, setDirection] = useState<Direction>(Direction.Automatic);
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [matte, setMatte] = useState('#000000');
  const [perFrame, setPerFrame] = useState(true);
  const [spriteSheetImageFile, setSpriteSheetImageFile] = useState<File | null>(
    null,
  );
  const [toolsOpen, setToolsOpen] = useState(false);

  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Tools,
    apiGifResponse,
    asyncConvertEffect,
    dimension: dimension.toString(),
    directionOptions: DIRECTION_OPTIONS,
    duration: duration.toString(),
    isConvertButtonLoading: isLoading,
    isDimensionInfo: direction === Direction.Automatic,
    isDirectionInfo: direction === Direction.Automatic,
    matte,
    perFrameOptions: PER_FRAME_OPTIONS,
    toolsOpen,

    dimensionDescription: useMemo((): string => {
      return 'Use zero for square sprites.';
    }, []),

    dimensionLabel: useMemo((): string => {
      switch (direction) {
        case Direction.Automatic:
          return 'Sprite dimension in pixels';
        case Direction.Horizontal:
          return 'Sprite width in pixels';
        case Direction.Vertical:
          return 'Sprite height in pixels';
      }
    }, [direction]),

    handleConvertClick: useCallback(async (): Promise<void> => {
      if (spriteSheetImageFile === null) {
        return;
      }
      setIsLoading(true);
      const body: FormData = new FormData();
      body.append('dimension', dimension.toString());
      body.append('direction', direction);
      body.append('duration', duration.toString());
      body.append('matte', matte);
      body.append('perFrame', perFrame ? 'true' : 'false');
      body.append('sheet', spriteSheetImageFile);
      const responsePromise: Promise<Response> = fetch(
        process.env.REACT_APP_SPRITESHEET2GIF ??
          'https://api.charlesstover.com/spritesheet2gif',
        {
          body,
          cache: 'no-cache',
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
        },
      );
      asyncConvertEffect.current = responsePromise;
      try {
        const response: Response = await responsePromise;
        const apiResponse: unknown = await response.json();
        if (isApiErrorResponse(apiResponse)) {
          throw new Error(apiResponse.message);
        }
        if (!isApiGifResponse(apiResponse)) {
          throw new Error('Invalid API response.');
        }
        setApiGifResponse(apiResponse);
        setError(null);
      } catch (err: unknown) {
        setApiGifResponse(null);
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }, [dimension, direction, duration, matte, perFrame, spriteSheetImageFile]),

    handleDimensionChange: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<Readonly<InputProps.ChangeDetail>>
        >,
      ): void => {
        const newDimension: number = parseInt(e.detail.value, 10);
        if (newDimension >= ZERO) {
          setDimension(newDimension);
        } else {
          setDimension(ZERO);
        }
      },
      [],
    ),

    handleDimensionInfoFollow: useCallback((): void => {
      if (direction === Direction.Automatic) {
        setTools((): ComponentType<unknown> => AutomaticDimensionInfo);
        setToolsOpen(true);
      }
    }, [direction]),

    handleDirectionChange: useCallback(
      (e: ReadonlySelectChangeEvent): void => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const newDirection: Direction = e.detail.selectedOption
          .value as Direction;
        setDirection(newDirection);
        if (
          newDirection !== Direction.Automatic &&
          (Tools === AutomaticDirectionInfo || Tools === AutomaticDimensionInfo)
        ) {
          setToolsOpen(false);
        }
      },
      [Tools],
    ),

    handleDirectionInfoFollow: useCallback((): void => {
      if (direction === Direction.Automatic) {
        setTools((): ComponentType<unknown> => AutomaticDirectionInfo);
        setToolsOpen(true);
      }
    }, [direction]),

    handleDurationChange: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<Readonly<InputProps.ChangeDetail>>
        >,
      ): void => {
        const newDuration: number = parseInt(e.detail.value, 10);
        if (newDuration >= ZERO) {
          setDuration(newDuration);
        } else {
          setDuration(ZERO);
        }
      },
      [],
    ),

    handleHeaderInfoFollow: useCallback((): void => {
      setTools((): ComponentType<unknown> => HeaderInfo);
      setToolsOpen(true);
    }, []),

    handleMatteChange: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<Readonly<InputProps.ChangeDetail>>
        >,
      ): void => {
        setMatte(e.detail.value);
      },
      [],
    ),

    handleMatteInfoFollow: useCallback((): void => {
      setTools((): ComponentType<unknown> => MatteInfo);
      setToolsOpen(true);
    }, []),

    handlePerFrameChange: useCallback((e: ReadonlySelectChangeEvent): void => {
      setPerFrame(e.detail.selectedOption.value === 'true');
    }, []),

    handleSpriteSheetImageFileChange: useCallback(
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files === null) {
          setSpriteSheetImageFile(null);
          return;
        }
        const firstFile: File | undefined = e.target.files[FIRST];
        if (typeof firstFile === 'undefined') {
          setSpriteSheetImageFile(null);
          return;
        }
        setSpriteSheetImageFile(firstFile);
      },
      [],
    ),

    handleToolsChange: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<Readonly<AppLayoutProps.ChangeDetail>>
        >,
      ): void => {
        setToolsOpen(e.detail.open);
      },
      [],
    ),

    notifications: useMemo((): FlashbarProps.MessageDefinition[] => {
      const newNotifications: FlashbarProps.MessageDefinition[] = [];
      if (error !== null) {
        newNotifications.push({
          content: error.message,
          dismissLabel: 'Dismiss',
          dismissible: true,
          header: 'An error occurred.',
          type: 'error',
          onDismiss(): void {
            setError(null);
          },
        });
      }
      return newNotifications;
    }, [error]),

    selectedDirectionOption: useMemo((): SelectProps.Option => {
      const findSelectedDirectionOption = ({
        value,
      }: Readonly<SelectProps.Option>): boolean => value === direction;
      const newSelectedDirectionOption: SelectProps.Option | undefined =
        DIRECTION_OPTIONS.find(findSelectedDirectionOption);
      if (typeof newSelectedDirectionOption === 'undefined') {
        throw new Error(`Cannot find direction: ${direction}`);
      }
      return newSelectedDirectionOption;
    }, [direction]),

    selectedPerFrameOption: useMemo((): SelectProps.Option => {
      const perFrameStr: string = perFrame ? 'true' : 'false';
      const findSelectedPerFrameOption = ({
        value,
      }: Readonly<SelectProps.Option>): boolean => value === perFrameStr;
      const newSelectePerFrameOption: SelectProps.Option | undefined =
        PER_FRAME_OPTIONS.find(findSelectedPerFrameOption);
      if (typeof newSelectePerFrameOption === 'undefined') {
        throw new Error(`Cannot find per frame value: ${perFrameStr}`);
      }
      return newSelectePerFrameOption;
    }, [perFrame]),
  };
}
