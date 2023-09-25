import type { RenderHookOptions } from '@testing-library/react';
import type { UseAwsuiTableItemDescriptionProps } from '../../hooks/use-awsui-table-item-description.js';
import mapElementToProps from '../utils/map-element-to-props.js';
import type TestItem from '../types/test-item.js';

export default function mapElementToRenderHookOptions(
  element: HTMLElement | null,
): RenderHookOptions<UseAwsuiTableItemDescriptionProps<TestItem>> {
  return {
    initialProps: mapElementToProps(element),
  };
}
