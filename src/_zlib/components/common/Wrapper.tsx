import { styled } from 'styled-components';

export function Wrapper({ ...props }) {
  return <StyledWrapper {...props} />;
}

const StyledWrapper = styled.div`
  display: flex;

  &.app {
    height: 100vh;

    justify-content: center;
  }
  &.loading {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.sign-form {
    height: 100%;

    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
  }
  &.form {
    flex-direction: column;
    align-items: center;
    width: 80%;
    gap: 10px;
  }

  &.navbar {
    display: gird;
    gap: 20px;
    grid-template-columns: 1fr 4fr;
    height: 100%;
    padding: 0 20px;
    border-right: 1px solid gray;
  }

  &.home {
    display: grid;
    gap: 50px;
    grid-template-rows: 1fr 5fr;
    border-right: 1px solid gray;
  }
  &.post-tweet {
    width: 600px;
    justify-content: center;
    align-items: center;
  }
  &.buttons {
    padding: 0 1rem;
    justify-content: space-between;
    align-items: center;
  }
`;
