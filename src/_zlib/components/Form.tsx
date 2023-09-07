import { styled } from 'styled-components';

export default function Form({ ...props }) {
  return <StyledForm {...props} />;
}

const StyledForm = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;
