import styled from "styled-components";

import { NextRouter, useRouter } from "next/router";

import dynamic from "next/dynamic";
import { useFetch } from "@/hooks/useFetch";
import { Loading } from "@/components";

const ViewerContainer = dynamic(
  () => import("../../../components").then((m) => m.ViewerContainer),
  { ssr: false }
);

type Data = {
  completedYear: number;
  projectTitle: string;
  projectDescription: string;
};

export default function Project() {
  const router: NextRouter = useRouter();
  const projectId: string | string[] | undefined = router.query.projectId;

  const [fetchedData, isLoading] = useFetch<Data>(
    `/api/project/post?projectid=${projectId}`
  );
  return (
    <Wrap>
      {isLoading && <Loading />}
      {fetchedData && (
        <>
          <div className="year">{fetchedData.completedYear}</div>
          <div className="title">{fetchedData.projectTitle}</div>
          <ViewerContainer content={fetchedData.projectDescription} />
        </>
      )}
    </Wrap>
  );
}
const Wrap = styled.div`
  .year {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.subTextColor};
  }
  .title {
    font-size: 35px;
    font-weight: bold;
  }
`;
