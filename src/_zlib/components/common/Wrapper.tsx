import colors from '../../constants/colors';
import { styled } from 'styled-components';

export function Wrapper({ ...props }) {
  return <StyledWrapper {...props} />;
}

const StyledWrapper = styled.div`
  // Common
  &.row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &.row-spacing {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &.column {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &.column-center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  // Layout
  &.app {
    display: flex;
    justify-content: center;
    height: 100vh;
  }
  &.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  &.navbar {
    height: 100%;
    padding: 0 1rem;
    border-right: 1px solid ${colors.gray01};
  }

  // Sign
  &.sign-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    height: 100%;
    padding: 50px 0px;
  }
  &.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    gap: 10px;
  }

  // Home
  &.home {
    overflow-y: scroll;
    width: 600px;
    border-right: 1px solid ${colors.gray01};
  }
  &.post-tweet {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.buttons {
    border-top: 1px solid ${colors.gray01};
    border-bottom: 1px solid ${colors.gray01};
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &.tweet {
    display: flex;
    border: 1px solid ${colors.gray01};
    padding: 1rem;

    > div > svg {
      width: 1.5rem;
      border: 1px solid ${colors.gray01};
      border-radius: 50%;
      margin-right: 10px;
    }
    > div > img {
      border: 1px solid ${colors.gray01};
      border-radius: 50%;
      margin-right: 10px;
    }
  }

  // Profile
  &.profile {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    border-right: 1px solid ${colors.gray01};
  }
  &.profile-info {
    width: 100%;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${colors.gray01};
  }
  &.profile-detail {
    padding: 0 1rem;
  }
  &.profile-date {
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      width: 20px;
      margin-right: 5px;
    }
  }
`;
