import { useState, useEffect, useContext } from "react";

import styled from "styled-components";

import dynamic from "next/dynamic";
import { JournalListProps, JournalPostProps, ModalProps } from "@/types/pages";
import Image from "next/image";
import { CustomThemeContext } from "@/pages/_app";
import { useFetch } from "@/hooks/useFetch";

import { Loading } from "@/components";

const ViewerContainer = dynamic(
  () => import("../../components").then((m) => m.ViewerContainer),
  { ssr: false }
);
type ProjectData = { projectId: number; projectTitle: string }[];

type JournalsData = { journalId: number; journalTitle: string }[];

type JournalData = {
  projectTitle: string;
  journalTitle: string;
  journalDescription: string;
};

const JournalList = ({ nowModalId, setNowJournalId }: JournalListProps) => {
  const [fetchedData, isLoading] = useFetch<JournalsData>(
    `/api/journal/list?projectid=${nowModalId}`
  );
  const [isActiveList, setIsActiveList] = useState<number>(1);

  const [isActiveMobile, setIsActiveMobile] = useState<boolean>(false);

  useEffect(() => {
    if (fetchedData && fetchedData.length !== 0) {
      setNowJournalId(fetchedData[0].journalId);
    }
  }, [fetchedData]);

  useEffect(() => {
    setIsActiveList(1);
    setIsActiveMobile(false);
  }, [nowModalId]);

  return (
    <StyledJournalList
      $isactivelist={isActiveList}
      $isactivemobile={isActiveMobile}
    >
      <button
        onClick={() =>
          setIsActiveMobile((prevTheme: boolean) => {
            return prevTheme ? false : true;
          })
        }
      >
        일지 리스트 {isActiveMobile ? "닫기" : "열기"}
      </button>
      {isLoading && <Loading />}
      <div className="wrap">
        <ul>
          {fetchedData?.map((list, index) => (
            <li
              key={list.journalId}
              onClick={() => {
                setIsActiveList(index + 1);
                setNowJournalId(list.journalId);
              }}
            >
              {index + 1} .{list.journalTitle}
            </li>
          ))}
        </ul>
      </div>
    </StyledJournalList>
  );
};

const JournalPost = ({ nowJournalId }: JournalPostProps) => {
  const [fetchedData, isLoading] = useFetch<JournalData>(
    `/api/journal/post?journalid=${nowJournalId}`
  );

  return (
    <StyledJournalPost>
      {isLoading && <Loading />}
      {!isLoading && fetchedData && (
        <div className="content">
          <div className="header">
            <div className="projectTitle">{fetchedData.projectTitle}</div>
            <div className="journalTitle">{fetchedData.journalTitle}</div>
          </div>
          <div className="main">
            <div className="mainContent">
              <ViewerContainer content={fetchedData.journalDescription} />
            </div>
          </div>
        </div>
      )}
    </StyledJournalPost>
  );
};

const ModalContainer = ({
  isActive,
  setIsActive,
  nowModalId,
  setNowModalId,
}: ModalProps) => {
  const [nowJournalId, setNowJournalId] = useState<number>(0);
  const { theme } = useContext(CustomThemeContext);

  const cancelModal = () => {
    setIsActive(false);
    setNowModalId(0);
    setNowJournalId(0);
  };

  return (
    <StyledModal $isactive={isActive}>
      <JournalList nowModalId={nowModalId} setNowJournalId={setNowJournalId} />
      <JournalPost nowJournalId={nowJournalId} />
      <div className="exit" onClick={cancelModal}>
        <Image
          src={`/icon/exit_${theme}.png`}
          alt="ss"
          width="30"
          height="30"
        />
      </div>
    </StyledModal>
  );
};

export default function Log() {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [nowModalId, setNowModalId] = useState<number>(0);

  const [fetchedData, isLoading] = useFetch<ProjectData>(
    `/api/journal/projects`
  );

  const ViewProject = (projectId: number) => {
    // 모달 활성화
    setIsActiveModal(true);

    //활성화할 프로젝트 아이디 저장
    setNowModalId(projectId);
  };

  return (
    <Wrap $nowmodalid={nowModalId}>
      <ModalContainer
        isActive={isActiveModal}
        setIsActive={setIsActiveModal}
        nowModalId={nowModalId}
        setNowModalId={setNowModalId}
      />
      {isLoading && <Loading />}
      <ul>
        {fetchedData?.map((project) => (
          <li
            className="projectList"
            key={project.projectId}
            onClick={() => ViewProject(project.projectId)}
          >
            {project.projectTitle}
          </li>
        ))}
      </ul>
    </Wrap>
  );
}
const Wrap = styled.div<{ $nowmodalid: number }>`
  .projectList {
    cursor: pointer;
    padding-bottom: 20px;
    font-size: 25px;
    font-weight: bold;
    border-bottom: 1px solid ${({ theme }) => theme.colors.objectColor};
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.mainTextColor};
  }
  .projectList:nth-child(${({ $nowmodalid }) => $nowmodalid}) {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const StyledModal = styled.div<{ $isactive: boolean }>`
  visibility: ${({ $isactive }) => ($isactive ? "visible" : "hidden")};
  opacity: ${({ $isactive }) => ($isactive ? 1 : 0)};
  position: absolute;
  right: 0;
  bottom: 0;
  width: ${({ $isactive }) => ($isactive ? "60vw" : "50vw")};
  height: 100vh;
  transition:
    visibility 0.3s,
    opacity 0.3s,
    width 0.3s;
  display: flex;
  overflow-y: hidden;
  .exit {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  @media (max-width: ${({ theme }) => `${theme.mainLayout.width}px`}) {
    display: block;
    width: 100%;
    height: ${({ $isactive }) => ($isactive ? "100%" : "70%")};
    transition: height 0.3s;
  }
`;
const StyledJournalPost = styled.div`
  width: 75%;
  height: 100vh;
  padding: 49px 50px;
  position: relative;
  background: ${({ theme }) => theme.colors.mainBackgroundColor};
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
  .header {
    border-bottom: 1px solid ${({ theme }) => theme.colors.objectColor};
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 15px;
  }
  .projectTitle {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.subTextColor};
  }
  .journalTitle {
    font-size: 25px;
    font-weight: bold;
  }
  .main {
    flex-grow: 1;
    overflow: hidden;
  }
  .mainContent {
    height: 100%;
    overflow-y: scroll;
  }
  @media (max-width: ${({ theme }) => `${theme.mainLayout.width}px`}) {
    width: 100%;
    height: 100%;
  }
`;

const StyledJournalList = styled.div<{
  $isactivelist: number;
  $isactivemobile: boolean;
}>`
  width: 25%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.objectColor};
  button {
    display: none;
  }
  ul {
    padding: 49px 25px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  ul li {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  ul li:nth-child(${({ $isactivelist }) => $isactivelist}) {
    color: ${({ theme }) => theme.colors.mainColor};
  }
  @media (max-width: ${({ theme }) => `${theme.mainLayout.width}px`}) {
    height: auto;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 5;
    button {
      display: block;
      width: 100%;
      height: 40px;
      background-color: transparent;
      border: none;
      color: ${({ theme }) => theme.colors.white};
    }
    .wrap {
      padding: ${({ $isactivemobile }) => ($isactivemobile ? "10px" : "0px")};
      visibility: ${({ $isactivemobile }) =>
        $isactivemobile ? "visible" : "hidden"};
      height: ${({ $isactivemobile }) => ($isactivemobile ? "300px" : "0px")};
      opacity: ${({ $isactivemobile }) => ($isactivemobile ? 1 : 0)};
      overflow-y: scroll;
      transition:
        opacity 0.3s,
        height 0.3s;
    }
    ul {
      height: auto;
      padding: 0;
    }
  }
`;
