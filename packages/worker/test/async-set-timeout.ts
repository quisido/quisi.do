export default async function asyncSetTimeout(delay: number): Promise<void> {
  return new Promise((resolve): void => {
    setTimeout(resolve, delay);
  });
}
