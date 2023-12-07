import { StyledButton, MainHeader } from "@/components";
import Head from "next/head";

export default function Assets() {
  return (
    <div>
      <Head>
        <title>셀프 페이지 - 컴포넌트 모음</title>
      </Head>
      <div>헤더</div>
      <MainHeader />
      <div>버튼</div>
      <StyledButton text={"text"} type={"primary"} />
      <StyledButton text={"text"} type={"default"} width={200} height={50} />
    </div>
  );
}
