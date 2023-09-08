import { styled } from 'styled-components';

export function Form({ ...props }) {
  return <StyledForm {...props} />;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 10px;
`;
