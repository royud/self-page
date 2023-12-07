import "styled-components";

//theme.ts에서 사용할 변수 타입 지정

declare module "styled-components" {
  export interface DefaultTheme {
    colors: { black: string; white: string; orange: string };
  }
}
