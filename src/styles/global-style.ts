import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    box-sizing: border-box;
    font-size: 15px;
    min-width: 320px;
    padding: 0;
    margin: 0;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }
  * {
    box-sizing: border-box;
    &::-webkit-scrollbar {
      width: 20px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.objectColor};
      border-radius: 10px;
      background-clip: padding-box;
      border: 5px solid transparent;
    }
  }
  ul, ol, li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  body {
    background: ${({ theme }) => theme.colors.mainBackgroundColor};
    color: ${({ theme }) => theme.colors.mainTextColor};
    transition: background-color 0.3s, color 0.3s;
  }
`;
