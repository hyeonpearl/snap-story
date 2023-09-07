import { styled } from 'styled-components';

export default function Wrapper({ ...props }) {
  return <StyledWrapper {...props} />;
}

export const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
