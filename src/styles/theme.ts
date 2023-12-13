import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  colors: {
    mainTextColor: "#000000",
    descTextColor: "#4b4b4b",
    subTextColor: "#A094B4",
    white: "#ffffff",
    mainBackgroundColor: "#ffffff",
    objectColor: "#CCC6D9",
    mainColor: "#793AFF",
  },
  mainLayout: {
    width: 1100,
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    mainTextColor: "#ffffff",
    descTextColor: "#dbdbdb",
    subTextColor: "#887CA0",
    white: "#ffffff",
    mainBackgroundColor: "#212121",
    objectColor: "#5B4F74",
    mainColor: "#8851FF",
  },
  mainLayout: {
    width: 1100,
  },
};
