import MISSING_CONTAINER_ERROR from '../constants/missing-container-error';

export default function getContainer(): HTMLElement {
  const container: HTMLElement | null = document.getElementById('root');

  if (container === null) {
    throw MISSING_CONTAINER_ERROR;
  }

  return container;
}
