import { styled } from 'styled-components';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  type?: 'root' | 'page' | 'form' | 'bar';
}

export function Wrapper({ ...props }: Props) {
  return <StyledWrapper {...props} />;
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;

  &[type='root'] {
    height: 100vh;
  }

  &[type='page'] {
    height: 100vh;
    flex-direction: column;
    align-items: center;
    width: 420px;
  }

  &[type='form'] {
    flex-direction: column;
    align-items: center;
    width: 80%;
    gap: 10px;
  }

  &[type='bar'] {
    display: gird;
    gap: 20px;
    grid-template-columns: 1fr 4fr;
    height: 100%;
    padding: 0 20px;
    border-right: 1px solid gray;
  }
`;
