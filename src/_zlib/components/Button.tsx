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

  &[styled='primary'] {
    background: #1d9bf0;
    color: white;
  }
  &[styled='secondary'] {
    background: black;
    color: #1d9bf0;
    border: 1px solid #1d9bf0;
  }
`;
