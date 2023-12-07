import { useEffect } from "react";

import { useRouter } from "next/router";

import { ROUTE_PROJECTS } from "@/pages/const";

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTE_PROJECTS);
  }, []);
  return <></>;
}
