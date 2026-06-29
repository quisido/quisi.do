import mapNavigatorToSemanticResourceAttributes, {
  type SemanticResourceNavigatorAttributes,
} from './map-navigator-to-semantic-resource-attributes.js';

export default function getSemanticResourceNavigatorAttributes():
  | Record<string, never>
  | SemanticResourceNavigatorAttributes {
  if (typeof window === 'undefined') {
    return {};
  }

  return mapNavigatorToSemanticResourceAttributes(window.navigator);
}
