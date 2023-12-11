import styled from "styled-components";

import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { ROUTE_ADMIN, ROUTE_LOGIN } from "@/const";

import LocalStorage from "@/utils/localstorage";

type LayoutProps = { children: React.ReactNode };

export const AdminLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const loginName = LocalStorage.getItem("adminId");

  useEffect(() => {
    loginName !== process.env.NEXT_PUBLIC_ADMIN_NAME &&
      router.push(ROUTE_ADMIN + ROUTE_LOGIN);
  }, [loginName]);

  return <Wrap>{children}</Wrap>;
};

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
