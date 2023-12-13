import { LayoutProps } from "@/types/components";
import { styled } from "styled-components";

export const MainWidth = ({ children }: LayoutProps) => {
  return <Wrap>{children}</Wrap>;
};

const Wrap = styled.div`
  width: ${({ theme }) => `${theme.mainLayout.width}px`};
  height: 100%;
  margin: 0 auto;
  @media (max-width: ${({ theme }) => `${theme.mainLayout.width}px`}) {
    width: 95%;
  }
`;
