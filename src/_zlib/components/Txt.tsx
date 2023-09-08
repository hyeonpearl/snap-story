import React from 'react';
import { css, styled } from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  typography?: string;
}

export default function Txt({ typography, ...props }: Props) {
  return <StyledTxt typography={typography} {...props} />;
}

export const StyledTxt = styled.span<Props>`
  ${({ typography }) =>
    typography === 'h1' &&
    css`
      font-size: 48px;
    `};

  ${({ typography }) =>
    typography === 'h4' &&
    css`
      font-size: 24px;
    `};

  ${({ typography }) =>
    typography === 'error' &&
    css`
      margin-top: 10px;
      font-weight: 600;
      color: tomato;
    `};
`;
