import colors from '../../constants/colors';
import { styled } from 'styled-components';

export function Menu({ ...props }) {
  return <StyledMenu {...props} />;
}

Menu.Item = ({ ...props }) => {
  return <StyledItem {...props} />;
};

const StyledMenu = styled.div`
  display: flex;
  align-items: center;

  &.column {
    gap: 20px;
    flex-direction: column;
  }
`;

const StyledItem = styled.div`
  &.navbar {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    border-radius: 50%;

    svg {
      width: 30px;
    }

    &:hover {
      background: ${colors.gray01};
      opacity: 0.8;
    }
  }
  &.tweet-control {
    svg {
      width: 1rem;
      margin-left: 0.5rem;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        background: ${colors.gray01};
      }
    }
  }
`;
