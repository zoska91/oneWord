import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    * {
    /*temporary helper
    uncomment to see borders of every HTML element on the website, helps with positioning*/
    /* border: 1px blue solid;  */
    }

    *, *:before, *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
    }

    body, html {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
`;

export default GlobalStyle;
