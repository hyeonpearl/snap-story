import colors from '../constants/colors';
import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
  ${reset}

  body {
    background: ${colors.black};
    color: ${colors.white};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }

  a {
    color: ${colors.white};
  }
`;

export default GlobalStyles;
