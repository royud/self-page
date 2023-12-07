import { useState, useEffect } from "react";

import styled from "styled-components";

import dynamic from "next/dynamic";

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

type ModalProps = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  nowModalId: number;
  setNowModalId: React.Dispatch<React.SetStateAction<number>>;
};
type JournalListProps = {
  nowModalId: number;
  nowJournalId: number;
  setNowJournalId: React.Dispatch<React.SetStateAction<number>>;
};
type JournalPostProps = { nowJournalId: number };

const JournalList = ({
  nowModalId,
  nowJournalId,
  setNowJournalId,
}: JournalListProps) => {
  const [nowJournalList, setNowJournalList] =
    useState<{ journalId: number; journalTitle: string }[]>();
  const [isActiveList, setIsActiveList] = useState<number>(1);
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
  }, [nowModalId]);
  return (
    <StyledJournalList $isactivelist={isActiveList}>
      {nowJournalList?.map((list, index) => (
        <li
          className="journalList"
          key={list.journalId}
          onClick={(e) => {
            setIsActiveList(index + 1);
            setNowJournalId(list.journalId);
          }}
        >
          {index + 1} .{list.journalTitle}
        </li>
      ))}
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
        <>
          <div className="modalHeader">
            <div className="projectTitle">{nowJournal.projectTitle}</div>
            <div className="journalTitle">{nowJournal.journalTitle}</div>
          </div>
          <ViewerContainer content={nowJournal.journalDescription} />
        </>
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

  const cancelModal = () => {
    setIsActive(false);
    setNowModalId(0);
    setNowJournalId(0);
  };

  return (
    <StyledModal $isactive={isActive}>
      <JournalList
        nowModalId={nowModalId}
        nowJournalId={nowJournalId}
        setNowJournalId={setNowJournalId}
      />
      <JournalPost nowJournalId={nowJournalId} />
      <div className="exit" onClick={cancelModal}></div>
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

const StyledProjectList = styled.li<{ $isactive: boolean }>`
  cursor: pointer;
  padding-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
  border-bottom: 1px solid ${({ theme }) => theme.colors.objectColor};
  margin-bottom: 20px;
  color: ${({ $isactive, theme }) =>
    $isactive ? theme.colors.mainColor : theme.colors.mainTextColor};
`;

const StyledModal = styled.div<{ $isactive: boolean }>`
  visibility: ${({ $isactive }) => ($isactive ? "visible" : "hidden")};
  opacity: ${({ $isactive }) => ($isactive ? 1 : 0)};
  position: absolute;
  right: 0;
  top: 0;
  width: ${({ $isactive }) => ($isactive ? "60vw" : "30vw")};
  height: 100vh;
  transition: opacity 0.3s, width 0.3s;
  display: flex;
  .modalContent {
    width: 50vw;
    height: 100vh;
    padding: 49px 50px;
    position: relative;
    background: ${({ theme }) => theme.colors.white};
    overflow-y: scroll;
  }
  .modalHeader {
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
  .exit {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 30px;
    height: 30px;
    background: gray;
    cursor: pointer;
  }
`;
const StyledJournalList = styled.ul<{ $isactivelist: number }>`
  width: 15vw;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.objectColor};
  padding: 49px 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  .journalList {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .journalList:nth-child(${({ $isactivelist }) => $isactivelist}) {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;
