import type { InputProps } from '@awsui/components-react/input';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { SelectProps } from '@awsui/components-react/select';
import type { ChangeEvent, ComponentType, MutableRefObject } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import type SelectChangeEvent from '../../../../types/readonly-awsui-select-change-event';
import AutomaticDimensionInfo from '../../components/automatic-dimension-info';
import AutomaticDirectionInfo from '../../components/automatic-direction-info';
import HeaderInfo from '../../components/header-info';
import MatteInfo from '../../components/matte-info';
import Direction from '../../constants/direction';

interface ApiErrorResponse {
  readonly message: string;
}

interface ApiGifResponse {
  readonly height: number;
  readonly image: string;
  readonly width: number;
}

interface Props {
  readonly onError: (error: Readonly<Error>) => void;
  readonly onErrorDismiss: VoidFunction;
  readonly onHelpDismiss: VoidFunction;
  readonly onHelpRequest: (Help: ComponentType<unknown>) => void;
}

interface State {
  readonly apiGifResponse: ApiGifResponse | null;
  readonly asyncConvertEffect: MutableRefObject<Promise<Response> | null>;
  readonly dimension: string;
  readonly dimensionDescription: string;
  readonly dimensionLabel: string;
  readonly directionOptions: SelectProps.Options;
  readonly duration: string;
  readonly handleConvertClick: VoidFunction;
  readonly handleDimensionInfoFollow: VoidFunction;
  readonly handleDirectionInfoFollow: VoidFunction;
  readonly handleHeaderInfoFollow: VoidFunction;
  readonly handleMatteInfoFollow: VoidFunction;
  readonly isConvertButtonLoading: boolean;
  readonly isDimensionInfo: boolean;
  readonly isDirectionInfo: boolean;
  readonly matte: string;
  readonly perFrameOptions: SelectProps.Options;
  readonly selectedDirectionOption: SelectProps.Option;
  readonly selectedPerFrameOption: SelectProps.Option;
  readonly handleDimensionChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<InputProps.ChangeDetail>>
    >,
  ) => void;
  readonly handleDirectionChange: (event: SelectChangeEvent) => void;
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
  readonly handlePerFrameChange: (event: SelectChangeEvent) => void;
  readonly handleSpriteSheetImageFileChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
}

const DEFAULT_DIMENSION = 0;
const DEFAULT_DURATION = 80;
const FIRST = 0;
const ZERO = 0;

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

export default function useSpriteSheet2GifContent({
  onError,
  onErrorDismiss,
  onHelpDismiss,
  onHelpRequest,
}: Readonly<Props>): State {
  const asyncConvertEffect: MutableRefObject<Promise<Response> | null> =
    useRef(null);

  const [apiGifResponse, setApiGifResponse] = useState<ApiGifResponse | null>(
    null,
  );
  const [dimension, setDimension] = useState(DEFAULT_DIMENSION);
  const [direction, setDirection] = useState<Direction>(Direction.Automatic);
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [isLoading, setIsLoading] = useState(false);
  const [matte, setMatte] = useState('#000000');
  const [perFrame, setPerFrame] = useState(true);
  const [spriteSheetImageFile, setSpriteSheetImageFile] = useState<File | null>(
    null,
  );

  const handleConvertClick = useCallback(async (): Promise<void> => {
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
      onErrorDismiss();
    } catch (err: unknown) {
      setApiGifResponse(null);
      if (!(err instanceof Error)) {
        throw new Error(`Expected an error, but received ${typeof err}`);
      }
      onError(err);
    } finally {
      setIsLoading(false);
    }
  }, [
    dimension,
    direction,
    duration,
    matte,
    onError,
    onErrorDismiss,
    perFrame,
    spriteSheetImageFile,
  ]);

  return {
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

    handleConvertClick: useCallback((): void => {
      void handleConvertClick();
    }, [handleConvertClick]),

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
      if (direction !== Direction.Automatic) {
        return;
      }
      onHelpRequest(AutomaticDimensionInfo);
    }, [direction, onHelpRequest]),

    handleDirectionChange: useCallback(
      (e: SelectChangeEvent): void => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const newDirection: Direction = e.detail.selectedOption
          .value as Direction;
        setDirection(newDirection);
        onHelpDismiss();
        /*
        if (
          newDirection !== Direction.Automatic &&
          (Help === AutomaticDirectionInfo || Help === AutomaticDimensionInfo)
        ) {
          onHelpDismiss();
        }
        */
      },
      [onHelpDismiss],
    ),

    handleDirectionInfoFollow: useCallback((): void => {
      if (direction === Direction.Automatic) {
        onHelpRequest(AutomaticDirectionInfo);
      }
    }, [direction, onHelpRequest]),

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
      onHelpRequest(HeaderInfo);
    }, [onHelpRequest]),

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
      onHelpRequest(MatteInfo);
    }, [onHelpRequest]),

    handlePerFrameChange: useCallback((e: SelectChangeEvent): void => {
      setPerFrame(e.detail.selectedOption.value === 'true');
    }, []),

    handleSpriteSheetImageFileChange: useCallback(
      (e: Readonly<ChangeEvent<HTMLInputElement>>): void => {
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
