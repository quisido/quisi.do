export default function createWritableWindow(): Window & typeof globalThis {
  const writableWindow: Window & typeof globalThis = {
    ...global.window,
  };

  Object.defineProperty(writableWindow, 'location', {
    writable: true,
    value: {
      href: 'https://charlesstover.com/',
    },
  });

  return writableWindow;
}
