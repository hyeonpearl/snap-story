import { styled } from 'styled-components';

export function Input({ ...props }) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 16px;

  &[type='file'] {
    display: none;
  }
`;

Input.Label = ({ ...props }) => {
  return <StyledLabel {...props} />;
};

const StyledLabel = styled.label`
  width: 30px;

  cursor: pointer;
`;

Input.TextField = ({ ...props }) => {
  return <StyledTextField {...props} />;
};

const StyledTextField = styled.textarea`
  border: none;
  padding: 1rem;
  font-size: 20px;
  color: white;
  background-color: black;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
