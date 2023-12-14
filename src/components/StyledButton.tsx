import { StyledButtonProps } from "@/types/components";
import { styled } from "styled-components";

export const StyledButton = ({
  children,
  type = "default",
  width,
  height,
  onClick,
}: StyledButtonProps) => {
  return (
    <StyledButtonWrap
      type={type}
      onClick={onClick}
      width={width}
      height={height}
    >
      {children}
    </StyledButtonWrap>
  );
};

const StyledButtonWrap = styled.button<StyledButtonProps>`
  /* 공통 설정 */
  border-radius: 5px;
  padding: 5px 10px;
  width: ${({ width }) => width && `${width}px`};
  height: ${({ height }) => height && `${height}px`};
  cursor: pointer;

  /* primary */
  ${({ type, theme }) =>
    type === "primary" &&
    `
    background: ${theme.colors.mainColor};
    border: 1px solid ${theme.colors.mainColor};
    color:${theme.colors.white};
    `};

  /* default */
  ${({ type, theme }) =>
    type === "default" &&
    `
    background: ${theme.colors.mainTextColor};
    border: 1px solid ${theme.colors.mainTextColor};
    transition: border 0.3s;
    color: ${theme.colors.mainBackgroundColor};
    `};
`;
