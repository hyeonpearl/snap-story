import { styled } from 'styled-components';

export function Form({ ...props }) {
  return <StyledForm {...props} />;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  &.sign-form {
    width: 80%;
  }

  &.post-tweet {
    width: 100%;
  }
`;
