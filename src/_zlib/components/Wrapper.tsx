import React from 'react';
import { css, styled } from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type?: string;
  direction?: 'horizontal' | 'vertical';
}

export default function Wrapper({ type, direction, ...props }: Props) {
  return <StyledWrapper type={type} direction={direction} {...props} />;
}

const StyledWrapper = styled.div<Props>`
  height: 100vh;
  display: flex;
  justify-content: center;

  ${({ type }) =>
    type === 'form' &&
    css`
      margin-top: 50px;
      flex-direction: column;
      align-items: center;
      width: 420px;
    `}
`;
