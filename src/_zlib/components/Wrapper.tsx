import { styled } from 'styled-components';

export function Wrapper({ ...props }) {
  return <StyledWrapper {...props} />;
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &[type='form'] {
    height: 100vh;
    flex-direction: column;
    align-items: center;
    width: 420px;
  }
`;
