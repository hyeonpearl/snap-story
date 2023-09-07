import { HTMLAttributes } from 'react';
import { css, styled } from 'styled-components';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  typography?: string;
}

export default function Txt({ typography, ...props }: Props) {
  return <StyledTxt typography={typography} {...props} />;
}

export const StyledTxt = styled.span<Props>`
  font-size: 1rem;

  ${({ typography }) =>
    typography === 'title' &&
    css`
      font-size: 48px;
    `};
`;
