import { CustomThemeContext } from "@/pages/_app";
import { useContext } from "react";
import styled from "styled-components";

export const DarkButton = () => {
  const { theme, changeTheme } = useContext(CustomThemeContext);
  return <Wrap onClick={changeTheme}>{theme}</Wrap>;
};

const Wrap = styled.button`
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  background-color: ${({ theme }) => theme.colors.mainTextColor};
  color: ${({ theme }) => theme.colors.mainBackgroundColor};
`;
