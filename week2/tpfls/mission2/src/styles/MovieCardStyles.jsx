import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #232649;
    }

    #root {
        width: 100%;
        height: 100%;
    }
`;

export default GlobalStyle;
