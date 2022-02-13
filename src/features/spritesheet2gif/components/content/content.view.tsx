import FormField from '@awsui/components-react/form-field';
import Input from '@awsui/components-react/input';
import Link from '@awsui/components-react/link';
import Select from '@awsui/components-react/select';
import SpaceBetween from '@awsui/components-react/space-between';
import type { ReactElement } from 'react';
import Container from '../../../../components/container';
import validateString from '../../../../utils/validate-string';
import ApiGifResponse from '../../components/api-gif-response';
import Footer from '../../components/footer';
import ImageFileInput from '../../components/image-file-input';
import Header from '../../components/header';
import type ContentsProps from '../../types/content-props';
import useSpriteSheet2GifContent from './content.hook';
import styles from './content.module.scss';

const headerClassName: string = validateString(styles.header);
const matteClassName: string = validateString(styles.matte);

export default function SpriteSheet2GifContent({
  onError,
  onErrorDismiss,
  onHelpDismiss,
  onHelpRequest,
}: Readonly<ContentsProps>): ReactElement {
  const {
    apiGifResponse,
    dimension,
    dimensionDescription,
    dimensionLabel,
    directionOptions,
    duration,
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
    isConvertButtonLoading,
    isDimensionInfo,
    isDirectionInfo,
    matte,
    perFrameOptions,
    selectedDirectionOption,
    selectedPerFrameOption,
  } = useSpriteSheet2GifContent({
    onError,
    onErrorDismiss,
    onHelpDismiss,
    onHelpRequest,
  });

  return (
    <SpaceBetween direction="vertical" size="m">
      <Container
        footer={
          <Footer
            loading={isConvertButtonLoading}
            onSubmit={handleConvertClick}
          />
        }
        header={<Header onInfoFollow={handleHeaderInfoFollow} />}
        headerClassName={headerClassName}
      >
        <SpaceBetween direction="vertical" size="m">
          <ImageFileInput onChange={handleSpriteSheetImageFileChange} />

          <FormField label="Duration in milliseconds">
            <SpaceBetween direction="horizontal" size="m">
              <Input
                onChange={handleDurationChange}
                type="number"
                value={duration}
              />
              <Select
                ariaLabel="Total or per frame?"
                ariaRequired
                onChange={handlePerFrameChange}
                options={perFrameOptions}
                selectedAriaLabel="selected"
                selectedOption={selectedPerFrameOption}
              />
            </SpaceBetween>
          </FormField>
          <FormField
            description="The matte color for the image will be transparent in the animated GIF."
            info={
              <Link
                ariaLabel="Info"
                onFollow={handleMatteInfoFollow}
                variant="info"
              >
                Info
              </Link>
            }
            label="Matte"
          >
            <Input
              className={matteClassName}
              onChange={handleMatteChange}
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              type={'color' as 'text'}
              value={matte}
            />
          </FormField>
          <FormField
            description="Do the sprites stack horizontally or vertically?"
            info={
              isDirectionInfo && (
                <Link
                  ariaLabel="Info"
                  onFollow={handleDirectionInfoFollow}
                  variant="info"
                >
                  Info
                </Link>
              )
            }
            label="Tile direction"
          >
            <Select
              ariaLabel="Tile direction"
              ariaRequired
              onChange={handleDirectionChange}
              options={directionOptions}
              selectedAriaLabel="selected"
              selectedOption={selectedDirectionOption}
            />
          </FormField>
          <FormField
            description={dimensionDescription}
            info={
              isDimensionInfo && (
                <Link
                  ariaLabel="Info"
                  onFollow={handleDimensionInfoFollow}
                  variant="info"
                >
                  Info
                </Link>
              )
            }
            label={dimensionLabel}
          >
            <Input
              onChange={handleDimensionChange}
              type="number"
              value={dimension}
            />
          </FormField>
        </SpaceBetween>
      </Container>
      {apiGifResponse && <ApiGifResponse {...apiGifResponse} />}
    </SpaceBetween>
  );
}
