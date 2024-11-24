export default async function asyncSetTimeout(
  callback: () => void,
  delay: number,
): Promise<void> {
  return new Promise((resolve): void => {
    setTimeout((): void => {
      callback();
      resolve();
    }, delay);
  });
}
