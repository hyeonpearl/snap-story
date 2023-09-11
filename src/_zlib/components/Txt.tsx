import { styled } from 'styled-components';

export function Txt({ ...props }) {
  return <StyledTxt {...props} />;
}

export const StyledTxt = styled.span`
  &[typography='h1'] {
    font-size: 48px;
  }

  &[typography='h4'] {
    font-size: 24px;
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
    color: tomato;
  }
`;
