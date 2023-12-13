import { useEffect, useState } from "react";

import styled from "styled-components";

import { useRouter } from "next/router";

import { ROUTE_PROJECTS } from "@/const";
import { ProjectListProps, YearListProps } from "@/types/pages";

// 데이터 불러오기
const getProjectsData = async () => {
  const data = await fetch(`/api/project/list`, {
    cache: "no-store",
  });
  return data.json();
};

const ProjectListContainer = ({
  projectTitle,
  projectId,
  thumnail,
}: ProjectListProps) => {
  const router = useRouter();
  return (
    <StyledProjectsList
      onClick={() => router.push(`${ROUTE_PROJECTS}/${projectId}`)}
      $thumnail={thumnail || ""}
    >
      <div className="bg"></div>
      <div className="text">{projectTitle}</div>
    </StyledProjectsList>
  );
};

const YearListContainer = ({ year, projects }: YearListProps) => {
  return (
    <StyledYearList>
      <div className="year">{year}</div>
      <ul>
        {projects.map((project) => (
          <ProjectListContainer
            key={project.projectId}
            projectTitle={project.projectTitle}
            projectId={project.projectId}
            thumnail={project.thumnail}
          />
        ))}
      </ul>
    </StyledYearList>
  );
};

export default function Projects() {
  const [projectsData, setProjectsData] = useState<
    {
      year: number;
      projects: ProjectListProps[];
    }[]
  >();
  const projectListData = async () => {
    const data = await getProjectsData();

    setProjectsData(data);
  };

  useEffect(() => {
    projectListData();
  }, []);
  return (
    <Wrap>
      {projectsData?.map((list) => (
        <YearListContainer
          key={list.year}
          year={list.year}
          projects={list.projects}
        />
      ))}
    </Wrap>
  );
}

const Wrap = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 70px;
  min-height: 500px;
`;
const StyledYearList = styled.li`
  .year {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 22px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

const StyledProjectsList = styled.li<{ $thumnail: string }>`
  cursor: pointer;
  width: 540px;
  height: 180px;
  font-size: 35px;
  font-weight: bold;
  position: relative;
  transition:
    transform 0.3s,
    color 0.3s;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => `${theme.colors.objectColor}`};
    ${({ $thumnail }) =>
      $thumnail &&
      `
    background-image : url('${$thumnail}');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    `}
    border-radius: 15px;
    transition: filter 0.3s;
    filter: brightness(0.9);
  }
  .text {
    position: absolute;
    left: 14px;
    bottom: 20px;
  }
  &:hover {
    transform: scale(1.05);
    color: ${({ theme }) => `${theme.colors.white}`};
  }
  &:hover .bg {
    filter: brightness(0.6);
  }
  @media (max-width: ${({ theme }) => `${theme.mainLayout.width}px`}) {
    width: 100%;
  }
`;
