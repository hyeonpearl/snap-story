import { css, styled } from 'styled-components';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  typography: 'p' | 'h1' | 'h4' | 'bold' | 'anker';
  color?: string;
}

export function Txt({ typography, color, ...props }: Props) {
  return <StyledTxt typography={typography} color={color} {...props} />;
}

export const StyledTxt = styled.span<Props>`
  color: ${({ color }) => color && color};

  ${({ typography }) =>
    typography === 'p' &&
    css`
      font-size: 16px;
    `}
  ${({ typography }) =>
    typography === 'h1' &&
    css`
      font-size: 48px;
      font-weight: 600;
    `}
  ${({ typography }) =>
    typography === 'h4' &&
    css`
      font-size: 24px;
      font-weight: 500;
    `}
    ${({ typography }) =>
    typography === 'bold' &&
    css`
      font-weight: 600;
    `}
    ${({ typography }) =>
    typography === 'anker' &&
    css`
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    `}
`;
