import colors from '../../constants/colors';
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

  &.profile {
    width: 80px;
    height: 80px;
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg {
      width: 50px;
      border-radius: 50%;
      border: 1px solid ${colors.gray01};
      padding: 1rem;
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 1px solid ${colors.gray01};
    }
  }
`;

Input.TextField = ({ ...props }) => {
  return <StyledTextField {...props} />;
};

const StyledTextField = styled.textarea`
  border: none;
  padding: 1rem;
  font-size: 20px;
  color: ${colors.white};
  background-color: ${colors.black};
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
  }
`;
