export interface Props {
  readonly name: string;
  readonly type: 'hero' | 'villain';
  readonly x: number;
  readonly y: number;
}

export default function Character({ type, x, y }: Props): void {
  switch (type) {
    case 'hero':
      return <image height={64} src="hero.png" width={48} x={x} y={y} />;

    case 'villain':
      return <image height={64} src="villain.png" width={48} x={x} y={y} />;
  }
}
