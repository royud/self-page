import styled from "styled-components";

import { useRouter } from "next/router";

import { ROUTE_PROJECTS } from "@/const";
import { ProjectListProps, YearListProps } from "@/types/pages";
import { useFetch } from "@/hooks/useFetch";
import { Loading } from "@/components";

type Data = {
  year: number;
  projects: ProjectListProps[];
}[];

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
  const [fetchedData, isLoading] = useFetch<Data>(`/api/project/list`);
  return (
    <Wrap>
      {isLoading && <Loading />}
      {fetchedData?.map((list) => (
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
  overflow: hidden;
  border-radius: 15px;
  color: #ffffff;
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

    transition: filter 0.3s;
    filter: brightness(0.9);
    transition:
      transform 0.3s,
      filter 0.3s;
  }
  .text {
    position: absolute;
    left: 14px;
    bottom: 20px;
  }
  &:hover .bg {
    filter: brightness(0.7);
    transform: scale(1.05);
  }
  @media (max-width: ${({ theme }) => `${theme.mainLayout.width}px`}) {
    width: 100%;
  }
`;
