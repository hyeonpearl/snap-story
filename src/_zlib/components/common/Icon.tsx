import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLImageElement> {
  src: string;
  width: number;
  height: number;
}

export function Icon({ src, width, height }: Props) {
  return <img src={src} width={width} height={height} />;
}
