import styled from 'styled-components';

export function Menu({ ...props }) {
  return <StyledMenu {...props} />;
}

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  div {
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
      background: gray;
      opacity: 0.8;
    }
  }
`;
