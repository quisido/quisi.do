import { AppLayoutProps } from '@awsui/components-react/app-layout';
import { FlashbarProps } from '@awsui/components-react/flashbar';
import { InputProps } from '@awsui/components-react/input';
import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { SelectProps } from '@awsui/components-react/select';
import {
  ChangeEvent,
  ComponentType,
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import AutomaticDimensionInfo from './components/automatic-dimension-info';
import AutomaticDirectionInfo from './components/automatic-direction-info';
import HeaderInfo from './components/header-info';
import MatteInfo from './components/matte-info';
import Direction from './constants/direction';

interface ApiErrorResponse {
  message: string;
}

interface ApiGifResponse {
  height: number;
  image: string;
  width: number;
}

type ApiResponse = ApiErrorResponse | ApiGifResponse;

type InputEvent = NonCancelableCustomEvent<InputProps.ChangeDetail>;

interface State {
  Tools: ComponentType<unknown>;
  apiGifResponse: ApiGifResponse | null;
  asyncConvertEffect: MutableRefObject<Promise<Response> | null>;
  dimension: string;
  dimensionDescription: string;
  dimensionLabel: string;
  directionOptions: SelectProps.Options;
  duration: string;
  handleConvertClick(): void;
  handleDimensionChange(event: InputEvent): void;
  handleDimensionInfoFollow(): void;
  handleDirectionChange: SelectProps['onChange'];
  handleDirectionInfoFollow(): void;
  handleDurationChange(event: InputEvent): void;
  handleHeaderInfoFollow(): void;
  handleMatteChange(event: InputEvent): void;
  handleMatteInfoFollow(): void;
  handlePerFrameChange: SelectProps['onChange'];
  handleSpriteSheetImageFileChange(event: ChangeEvent<HTMLInputElement>): void;
  handleToolsChange: AppLayoutProps['onToolsChange'];
  isConvertButtonLoading: boolean;
  isDimensionInfo: boolean;
  isDirectionInfo: boolean;
  matte: string;
  notifications: FlashbarProps.MessageDefinition[];
  perFrameOptions: SelectProps.Options;
  selectedDirectionOption: SelectProps.Option;
  selectedPerFrameOption: SelectProps.Option;
  toolsOpen: boolean;
}

const isApiErrorResponse = (
  apiResponse: ApiResponse,
): apiResponse is ApiErrorResponse =>
  Object.prototype.hasOwnProperty.call(apiResponse, 'message');

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

  const [Tools, setTools] = useState((): ComponentType<unknown> => HeaderInfo);
  const [apiGifResponse, setApiGifResponse] = useState<ApiGifResponse | null>(
    null,
  );
  const [dimension, setDimension] = useState(0);
  const [direction, setDirection] = useState<Direction>(Direction.Automatic);
  const [duration, setDuration] = useState(80);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [matte, setMatte] = useState('#000000');
  const [perFrame, setPerFrame] = useState(true);
  const [spriteSheetImageFile, setSpriteSheetImageFile] = useState<File | null>(
    null,
  );
  const [toolsOpen, setToolsOpen] = useState(false);

  const dimensionDescription: string = useMemo((): string => {
    return 'Use zero for square sprites.';
  }, []);

  const dimensionLabel: string = useMemo((): string => {
    switch (direction) {
      case Direction.Automatic:
        return 'Sprite dimension in pixels';
      case Direction.Horizontal:
        return 'Sprite width in pixels';
      case Direction.Vertical:
        return 'Sprite height in pixels';
    }
  }, [direction]);

  const notifications: FlashbarProps.MessageDefinition[] =
    useMemo((): FlashbarProps.MessageDefinition[] => {
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
    }, [error]);

  const selectedDirectionOption: SelectProps.Option =
    useMemo((): SelectProps.Option => {
      const findSelectedDirectionOption = ({
        value,
      }: SelectProps.Option): boolean => value === direction;
      const newSelectedDirectionOption: SelectProps.Option | undefined =
        DIRECTION_OPTIONS.find(findSelectedDirectionOption);
      if (typeof newSelectedDirectionOption === 'undefined') {
        throw new Error(`Cannot find direction: ${direction}`);
      }
      return newSelectedDirectionOption;
    }, [direction]);

  const selectedPerFrameOption: SelectProps.Option =
    useMemo((): SelectProps.Option => {
      const perFrameStr: string = perFrame ? 'true' : 'false';
      const findSelectedPerFrameOption = ({
        value,
      }: SelectProps.Option): boolean => value === perFrameStr;
      const newSelectePerFrameOption: SelectProps.Option | undefined =
        PER_FRAME_OPTIONS.find(findSelectedPerFrameOption);
      if (typeof newSelectePerFrameOption === 'undefined') {
        throw new Error(`Cannot find per frame value: ${perFrameStr}`);
      }
      return newSelectePerFrameOption;
    }, [perFrame]);

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
      process.env.REACT_APP_SPRITESHEET2GIF ||
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
      const apiResponse: ApiResponse = await response.json();
      if (isApiErrorResponse(apiResponse)) {
        throw new Error(apiResponse.message);
      }
      setApiGifResponse(apiResponse);
      setError(null);
    } catch (err) {
      setApiGifResponse(null);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [dimension, direction, duration, matte, perFrame, spriteSheetImageFile]);

  const handleDimensionChange = useCallback(
    (e: NonCancelableCustomEvent<InputProps.ChangeDetail>): void => {
      const newDimension: number = parseInt(e.detail.value, 10);
      if (newDimension >= 0) {
        setDimension(newDimension);
      } else {
        setDimension(0);
      }
    },
    [],
  );

  const handleDimensionInfoFollow = useCallback((): void => {
    switch (direction) {
      case Direction.Automatic: {
        setTools((): ComponentType<unknown> => AutomaticDimensionInfo);
        setToolsOpen(true);
        break;
      }
    }
  }, [direction]);

  const handleDirectionChange = useCallback(
    (e: NonCancelableCustomEvent<SelectProps.ChangeDetail>): void => {
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
  );

  const handleDirectionInfoFollow = useCallback((): void => {
    switch (direction) {
      case Direction.Automatic: {
        setTools((): ComponentType<unknown> => AutomaticDirectionInfo);
        setToolsOpen(true);
        break;
      }
    }
  }, [direction]);

  const handleDurationChange = useCallback(
    (e: NonCancelableCustomEvent<InputProps.ChangeDetail>): void => {
      const newDuration: number = parseInt(e.detail.value, 10);
      if (newDuration >= 0) {
        setDuration(newDuration);
      } else {
        setDuration(0);
      }
    },
    [],
  );

  const handleHeaderInfoFollow = useCallback((): void => {
    setTools((): ComponentType<unknown> => HeaderInfo);
    setToolsOpen(true);
  }, []);

  const handleMatteChange = useCallback(
    (e: NonCancelableCustomEvent<InputProps.ChangeDetail>): void => {
      setMatte(e.detail.value);
    },
    [],
  );

  const handleMatteInfoFollow = useCallback((): void => {
    setTools((): ComponentType<unknown> => MatteInfo);
    setToolsOpen(true);
  }, []);

  const handlePerFrameChange = useCallback(
    (e: NonCancelableCustomEvent<SelectProps.ChangeDetail>): void => {
      setPerFrame(e.detail.selectedOption.value === 'true');
    },
    [],
  );

  const handleSpriteSheetImageFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      if (e.target.files === null) {
        setSpriteSheetImageFile(null);
        return;
      }
      setSpriteSheetImageFile(e.target.files[0]);
    },
    [],
  );

  const handleToolsChange = useCallback(
    (e: NonCancelableCustomEvent<AppLayoutProps.ChangeDetail>): void => {
      setToolsOpen(e.detail.open);
    },
    [],
  );

  return {
    Tools,
    apiGifResponse,
    asyncConvertEffect,
    dimension: dimension.toString(),
    dimensionDescription,
    dimensionLabel,
    directionOptions: DIRECTION_OPTIONS,
    duration: duration.toString(),
    handleConvertClick,
    handleDimensionChange,
    handleDimensionInfoFollow,
    handleDirectionChange,
    handleDirectionInfoFollow,
    handleDurationChange,
    handleHeaderInfoFollow,
    handleMatteChange,
    handleMatteInfoFollow,
    handlePerFrameChange,
    handleSpriteSheetImageFileChange,
    handleToolsChange,
    isConvertButtonLoading: isLoading,
    isDimensionInfo: direction === Direction.Automatic,
    isDirectionInfo: direction === Direction.Automatic,
    matte,
    notifications,
    perFrameOptions: PER_FRAME_OPTIONS,
    selectedDirectionOption,
    selectedPerFrameOption,
    toolsOpen,
  };
}
