import colors from '../../constants/colors';
import { styled } from 'styled-components';

export function Button({ ...props }) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &.primary {
    background: ${colors.primary};
    color: ${colors.white};
  }
  &.secondary {
    background: ${colors.black};
    color: ${colors.primary};
    border: 1px solid ${colors.primary};
  }
  &.social {
    width: 100%;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;
