import { styled } from 'styled-components';

interface Props {
  direction: 'horizontal' | 'vertical';
  size: number;
}

export const Spacing = styled.div<Props>`
  flex: none;
  width: ${({ direction, size }) =>
    direction === 'horizontal' ? `${size}px` : undefined};
  height: ${({ direction, size }) =>
    direction === 'vertical' ? `${size}px` : undefined};
`;
