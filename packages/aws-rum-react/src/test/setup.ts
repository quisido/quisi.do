import fetch from 'whatwg-fetch';

// @ts-expect-error Not even `as Window['fetch']` works here. 😠
window.fetch = fetch;
