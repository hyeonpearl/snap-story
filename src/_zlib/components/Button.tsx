import styled from 'styled-components';

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

  &[type='primary'] {
    background: #1d9bf0;
    color: white;
  }
  &[type='secondary'] {
    background: black;
    color: #1d9bf0;
    border: 1px solid #1d9bf0;
  }
  &[type='social'] {
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;
