import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    button {
        cursor: pointer;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }


`;

export default GlobalStyles;
