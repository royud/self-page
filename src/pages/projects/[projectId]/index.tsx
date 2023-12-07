import styled from "styled-components";

import { useRouter } from "next/router";

import { useState, useEffect } from "react";

import dynamic from "next/dynamic";

const ViewerContainer = dynamic(
  () => import("../../../components").then((m) => m.ViewerContainer),
  { ssr: false }
);

export default function Project() {
  const router = useRouter();
  const projectId = router.query.projectId;

  const [year, setYear] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (projectId) {
      (async () => {
        const data = await fetch(
          `/api/project/post?projectid=${projectId}`
        ).then((res) => res.json());
        setYear(data.completedYear);
        setTitle(data.projectTitle);
        setDescription(data.projectDescription);
      })();
    }
  }, [projectId]);

  return (
    <Wrap>
      <div className="year">{year}</div>
      <div className="title">{title}</div>
      <ViewerContainer content={description} />
    </Wrap>
  );
}
const Wrap = styled.div`
  .year {
    font-size: 20px;
    color: ${({ $isactive, theme }) => `${theme.colors.subTextColor}`};
  }
  .title {
    font-size: 35px;
    font-weight: bold;
  }
`;
