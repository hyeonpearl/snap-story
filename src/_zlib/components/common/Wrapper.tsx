import colors from '../../constants/colors';
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
    gap: 1rem;
    grid-template-columns: 1fr 4fr;
    height: 100%;
    padding: 0 1rem;
    border-right: 1px solid ${colors.gray01};
  }

  &.home {
    display: grid;
    gap: 10px;
    grid-template-rows: 1fr 5fr;
    border-right: 1px solid ${colors.gray01};
  }
  &.post-tweet {
    width: 600px;
    justify-content: center;
    align-items: center;
  }
  &.buttons {
    border-top: 1px solid ${colors.gray01};
    margin: 0 1rem;
    padding: 1rem 0 0 0;
    justify-content: space-between;
    align-items: center;
  }
`;
