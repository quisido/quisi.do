import getNextData from './get-next-data.js';

export default function initNextData(): void {
  window.__NEXT_DATA__ = {
    buildId: 'mock-next-router',
    page: '/',
    props: {},
    query: {},
    ...getNextData(),
  };
}
