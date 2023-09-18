import colors from '../../constants/colors';
import { styled } from 'styled-components';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  typography:
    | 'p'
    | 'h1'
    | 'h4'
    | 'name'
    | 'check'
    | 'error'
    | 'anker'
    | 'delete';
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
  &[typography='name'] {
    font-weight: 600;
  }
  &[typography='check'] {
    font-weight: 600;
    color: ${colors.green01};
  }
  &[typography='error'] {
    font-weight: 600;
    color: ${colors.red01};
  }
  &[typography='anker'] {
    color: ${colors.primary};
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
  &[typography='delete'] {
    color: ${colors.red01};
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;
