/**
 *   The Rocket Loader hotfix loads synchronously, before the Rocket Loader
 * script and before any other scripts that may add unload event listeners.
 */

const addWindowEventListener: Window['addEventListener'] =
  Window.prototype.addEventListener.bind(window);

window.addEventListener = function addEventListenerSpy(
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions | boolean | undefined,
) {
  if (type === 'unload') {
    addWindowEventListener('pagehide', listener, options);
    return;
  }

  addWindowEventListener(type, listener, options);
};
