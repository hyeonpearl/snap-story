import styled from 'styled-components';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  typography: 'p' | 'h1' | 'h4' | 'bold' | 'anker';
  color?: string;
}

export function Txt({ color, ...props }: Props) {
  return <StyledTxt color={color} {...props} />;
}

export const StyledTxt = styled.span`
  color: ${({ color }) => color && color};

  &[typography='h1'] {
    font-size: 48px;
    font-weight: 600;
  }
  &[typography='h4'] {
    font-size: 24px;
    font-weight: 500;
  }
  &[typography='bold'] {
    font-weight: 600;
  }
  &[typography='anker'] {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;
