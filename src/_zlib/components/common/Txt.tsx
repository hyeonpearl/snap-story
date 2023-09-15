import colors from '../../constants/colors';
import { styled } from 'styled-components';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  typography: 'h1' | 'h4' | 'p' | 'anker' | 'error' | 'check';
}

export function Txt({ ...props }: Props) {
  return <StyledTxt {...props} />;
}

export const StyledTxt = styled.span`
  &[typography='h1'] {
    font-size: 48px;
    font-weight: 600;
  }

  &[typography='h4'] {
    font-size: 24px;
    font-weight: 500;
  }

  &[typography='anker'] {
    color: #1d9bf0;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  &[typography='error'] {
    font-weight: 600;
    color: ${colors.red01};
  }

  &[typography='check'] {
    font-weight: 600;
    color: ${colors.green01};
  }
`;
