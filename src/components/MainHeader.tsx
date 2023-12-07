import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import { styled } from "styled-components";

import { MainWidth } from "./MainWidth";

import { ROUTE_PROJECTS } from "@/pages/const";

// 로고
const LogoContainer = () => {
  const router = useRouter();

  return <StyledLogo onClick={() => router.push(ROUTE_PROJECTS)}></StyledLogo>;
};

// 메뉴
const NavList = ({ text, route }: { text: string; route: string }) => {
  const router = useRouter();
  const NavRef = useRef<HTMLLiElement>(null);
  const [navBar, setNavBar] = useState<number>(0);
  const [isActiveList, setIsActiveList] = useState<boolean>(false);

  const nowPage = router.pathname;

  // 현재 페이지가 해당 페이지에 맞을 시 활성화
  useEffect(() => {
    nowPage.includes(route) ? setIsActiveList(true) : setIsActiveList(false);
  }, [nowPage]);

  // 첫 로딩 시 바 크기 저장
  useEffect(() => {
    isActiveList ? setNavBar(NavRef.current.offsetWidth) : setNavBar(0);
  }, [isActiveList]);

  return (
    <StyledList
      ref={NavRef}
      $navbar={navBar}
      $isactivelist={isActiveList}
      onClick={() => router.push(route)}
    >
      {text}
    </StyledList>
  );
};

const NavContainer = ({
  nav,
}: {
  nav: {
    navId: number;
    title: string;
    route: string;
  };
}) => {
  return (
    <Nav>
      {nav.map((list) => (
        <NavList key={list.navId} text={list.title} route={list.route} />
      ))}
    </Nav>
  );
};
// --------------------------------------------------------------------------
export const MainHeader = ({
  nav,
}: {
  nav: {
    navId: number;
    title: string;
    route: string;
  };
}) => {
  const router = useRouter();
  return (
    <Wrap>
      <MainWidth>
        <div className="contents">
          <LogoContainer />
          <NavContainer nav={nav} />
        </div>
      </MainWidth>
    </Wrap>
  );
};

const Wrap = styled.div`
  height: 56px;
  .contents {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledLogo = styled.div`
  width: 30px;
  height: 30px;
  background: gray;
  border-radius: 50%;
  cursor: pointer;
`;

const Nav = styled.ul`
  display: flex;
  align-items: end;
  gap: 30px;
  height: 100%;
`;

const StyledList = styled.li<{ $navbar: number; $isactivelist: boolean }>`
  cursor: pointer;
  font-size: 19px;
  text-align: center;
  position: relative;
  padding-bottom: 7px;
  &::after {
    content: "";
    visibility: ${({ $isactivelist }) =>
      $isactivelist ? "visible" : "hidden"};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    width: ${({ $navbar }) => `${$navbar}px`};
    height: 2px;
    background: #000000;
    border-radius: 2px;
    transition: width 0.3s;
  }
`;
