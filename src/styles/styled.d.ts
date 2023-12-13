import "styled-components";

//theme.ts에서 사용할 변수 타입 지정
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      mainTextColor: string;
      descTextColor: string;
      subTextColor: string;
      white: string;
      mainBackgroundColor: string;
      objectColor: string;
      mainColor: string;
    };
    mainLayout: {
      width: number;
    };
  }
}
