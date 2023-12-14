import { useState, useEffect, useContext } from "react";

import styled from "styled-components";

import dynamic from "next/dynamic";
import { JournalListProps, JournalPostProps, ModalProps } from "@/types/pages";
import Image from "next/image";
import { CustomThemeContext } from "@/pages/_app";
const ViewerContainer = dynamic(
  () => import("../../components").then((m) => m.ViewerContainer),
  { ssr: false }
);

// 데이터 가져오기
const getProjectsData = async () => {
  const data = await fetch(`/api/journal/projects`, {
    cache: "no-store",
  });
  return data.json();
};
const getjournalsData = async (id: number) => {
  const data = await fetch(`/api/journal/list?projectid=${id}`, {
    cache: "no-store",
  });
  return data.json();
};
const getjournalData = async (id: number) => {
  if (id !== 0) {
    const data = await fetch(`/api/journal/post?journalid=${id}`, {
      cache: "no-store",
    });
    return data.json();
  }
};

const JournalList = ({ nowModalId, setNowJournalId }: JournalListProps) => {
  const [nowJournalList, setNowJournalList] =
    useState<{ journalId: number; journalTitle: string }[]>();
  const [isActiveList, setIsActiveList] = useState<number>(1);

  const [isActiveMobile, setIsActiveMobile] = useState<boolean>(false);

  const journalListData = async () => {
    const data = await getjournalsData(nowModalId);
    if (data.length !== 0) {
      setNowJournalId(data[0].journalId);
      setNowJournalList(data);
    }
  };

  useEffect(() => {
    journalListData();
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
      <div className="wrap">
        <ul>
          {nowJournalList?.map((list, index) => (
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
  const [nowJournal, setNowJournal] = useState<{
    projectTitle: string;
    journalTitle: string;
    journalDescription: string;
  }>();
  const journalData = async () => {
    const data = await getjournalData(nowJournalId);

    setNowJournal(data);
  };

  useEffect(() => {
    journalData();
  }, [nowJournalId]);
  return (
    <div className="modalContent">
      {nowJournal && (
        <div className="content">
          <div className="modalHeader">
            <div className="projectTitle">{nowJournal.projectTitle}</div>
            <div className="journalTitle">{nowJournal.journalTitle}</div>
          </div>
          <ViewerContainer content={nowJournal.journalDescription} />
        </div>
      )}
    </div>
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
  const [projectsData, setProjectsData] =
    useState<{ projectId: number; projectTitle: string }[]>();

  const ViewProject = (projectId: number) => {
    // 모달 활성화
    setIsActiveModal(true);

    //활성화할 프로젝트 아이디 저장
    setNowModalId(projectId);
  };

  const projectListData = async () => {
    const data = await getProjectsData();
    setProjectsData(data);
  };

  useEffect(() => {
    projectListData();
  }, []);

  return (
    <Wrap $nowmodalid={nowModalId}>
      <ModalContainer
        isActive={isActiveModal}
        setIsActive={setIsActiveModal}
        nowModalId={nowModalId}
        setNowModalId={setNowModalId}
      />
      <ul>
        {projectsData?.map((project) => (
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
  .modalContent {
    width: 75%;
    height: 100vh;
    padding: 49px 50px;
    position: relative;
    background: ${({ theme }) => theme.colors.mainBackgroundColor};
  }
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .modalHeader {
    border-bottom: 1px solid ${({ theme }) => theme.colors.objectColor};
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 15px;
    margin-bottom: 50px;
  }
  .projectTitle {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.subTextColor};
  }
  .journalTitle {
    font-size: 25px;
    font-weight: bold;
  }
  .exit {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  @media screen and (max-width: 1100px) {
    display: block;
    width: 100%;
    height: ${({ $isactive }) => ($isactive ? "100%" : "70%")};
    transition: height 0.3s;
    .modalContent {
      width: 100%;
      height: 100%;
    }
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
