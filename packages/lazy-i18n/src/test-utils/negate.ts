type F<A extends unknown[]> = (...args: A) => boolean;

export default function negate<A extends unknown[]>(f: F<A>): F<A> {
  return (...args: A): boolean => {
    return !f(...args);
  };
}
