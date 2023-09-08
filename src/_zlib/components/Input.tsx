import { styled } from 'styled-components';

export default function Input({ ...props }) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 16px;

  &[type='submit'],
  &[type='button'] {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;
