import { styled } from 'styled-components';

export function Wrapper({ ...props }) {
  return <StyledWrapper {...props} />;
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &[type='page'] {
    height: 100vh;
    flex-direction: column;
    width: 420px;
  }

  &[type='form'] {
    flex-direction: column;
    width: 80%;
    gap: 10px;
  }
`;
