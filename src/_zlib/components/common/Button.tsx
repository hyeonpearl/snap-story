import styled from 'styled-components';

export function Button({ ...props }) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  width: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &.primary {
    background: #1d9bf0;
    color: white;
  }
  &.secondary {
    background: black;
    color: #1d9bf0;
    border: 1px solid #1d9bf0;
  }
  &.social {
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;
