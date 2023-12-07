import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import { MainHeader, MainWidth } from "@/components";

import {
  ROUTE_MAIN,
  ROUTE_RESUME,
  ROUTE_PROJECTS,
  ROUTE_LOG,
} from "@/pages/const";

type LayoutProps = { children: React.ReactNode };

export const MainLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const nowPage = router.pathname;
  const [nowTitle, setNowTitle] = useState<string>("");

  //네비게이션 배열
  const navArr = [
    {
      navId: 1,
      title: "프로젝트",
      route: ROUTE_PROJECTS,
    },
    {
      navId: 2,
      title: "ABOUT",
      route: ROUTE_RESUME,
    },
    {
      navId: 3,
      title: "개발일지",
      route: ROUTE_LOG,
    },
  ];

  const nowPageObj = navArr.find((list) => nowPage.includes(list.route));

  useEffect(() => {
    nowPageObj && setNowTitle(nowPageObj.title);
  }, [nowPage]);

  return (
    <>
      <MainHeader nav={navArr} />
      <MainWidth>
        <Contents>
          <div className="title">{nowTitle}</div>
          {children}
        </Contents>
      </MainWidth>
    </>
  );
};

const Contents = styled.div`
  margin-top: 40px;
  .title {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 56px;
  }
`;
