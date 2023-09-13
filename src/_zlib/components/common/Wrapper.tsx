import { styled } from 'styled-components';

export function Wrapper({ ...props }) {
  return <StyledWrapper {...props} />;
}

const StyledWrapper = styled.div`
  display: flex;

  &.app {
    justify-content: center;
    height: 100vh;
  }

  &.form {
    flex-direction: column;
    align-items: center;
    width: 80%;
    gap: 10px;
  }

  &.sign-form {
    height: 100vh;
    flex-direction: column;
    align-items: center;
    width: 420px;
  }

  &.navbar {
    display: gird;
    gap: 20px;
    grid-template-columns: 1fr 4fr;
    height: 100%;
    padding: 0 20px;
    border-right: 1px solid gray;
  }

  &.post-tweet {
    flex-direction: column;
    gap: 10px;
    width: 600px;
  }
`;
