import { useEffect, useState } from "react";
import styled from "styled-components";

import {
  AdminTitle,
  InputWrap,
  EditorWrap,
  SelectWrap,
} from "@/components/admin";

import { StyledButton } from "@/components";

const Profile = () => {
  const [name, setName] = useState<string>("");
  const [work, setWork] = useState<string>("");
  const [stack, setStack] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    (async () => {
      const data = await fetch(`/api/admin/profile`).then((res) => res.json());
      if (data) {
        setName(data.name);
        setWork(data.work);
        setStack(data.stack);
        setEmail(data.email);
      }
    })();
  }, []);

  const submit = async () => {
    await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        work: work,
        stack: stack,
        email: email,
      }),
    }).then(() => alert("완료되었습니다."));
  };

  return (
    <ProfileWrapper>
      <InputWrap label="이름" type="text" value={name} setValue={setName} />
      <InputWrap label="분야" type="text" value={work} setValue={setWork} />
      <InputWrap label="태그" type="text" value={stack} setValue={setStack} />
      <InputWrap
        label="메일 주소"
        type="text"
        value={email}
        setValue={setEmail}
      />
      <div className="buttonWrap">
        <StyledButton onClick={submit} width={100} height={30}>
          저장
        </StyledButton>
      </div>
    </ProfileWrapper>
  );
};

const Project = () => {
  const [projectList, setProjectList] = useState([]);

  const [selectProject, setSelectProject] = useState<{
    id: number;
    year: number;
    title: string;
    description: string;
  }>({
    id: 0,
    year: 0,
    title: "",
    description: "",
  });

  const [year, setYear] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  //프로젝트 리스트 호출
  useEffect(() => {
    (async () => {
      const data = await fetch(`/api/admin/project/list`).then((res) =>
        res.json()
      );
      setProjectList(data);
    })();
  }, []);

  //프로젝트 본문 호출
  useEffect(() => {
    if (selectProject && selectProject.id !== 0) {
      (async () => {
        const data = await fetch(
          `/api/admin/project/post?projectid=${selectProject.id}`
        ).then((res) => res.json());
        setYear(data.completedYear);
        setTitle(data.projectTitle);
        setDescription(data.projectDescription);
      })();
    }
    if (selectProject && selectProject.id === 0) {
      setYear("");
      setTitle("");
      setDescription("");
    }
  }, [selectProject]);

  const submit = async () => {
    if (selectProject) {
      if (selectProject.id === 0) {
        await fetch("/api/admin/project/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            year: year,
            title: title,
            description: description,
          }),
        }).then(() => alert("완료되었습니다."));
      } else {
        await fetch("/api/admin/project/post", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId: selectProject.id,
            year: year,
            title: title,
            description: description,
          }),
        }).then(() => alert("완료되었습니다."));
      }
    }
  };

  return (
    <ProfileWrapper>
      <SelectWrap
        label="프로젝트 선택"
        addList={true}
        selectList={projectList}
        value={selectProject}
        setValue={setSelectProject}
      />
      <InputWrap
        label="프로젝트 년도"
        type="text"
        value={year || ""}
        setValue={setYear}
      />
      <InputWrap
        label="프로젝트 제목"
        type="text"
        value={title || ""}
        setValue={setTitle}
      />
      <EditorWrap
        label="내용"
        postId={selectProject.id}
        value={description}
        setValue={setDescription}
      />
      <div className="buttonWrap">
        <StyledButton onClick={submit} width={100} height={30}>
          저장
        </StyledButton>
      </div>
    </ProfileWrapper>
  );
};

const Journal = () => {
  const [projectList, setProjectList] = useState([]);
  const [journalList, setJournalList] = useState([]);

  const [selectProject, setSelectProject] = useState<{
    id: number;
    title: string;
    description: string;
  }>({
    id: 0,
    title: "",
    description: "",
  });
  const [selectJournal, setSelectJournal] = useState<{
    id: number;
    title: string;
    description: string;
  }>({
    id: 0,
    title: "",
    description: "",
  });
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  //프로젝트 리스트 호출
  useEffect(() => {
    (async () => {
      const data = await fetch("/api/admin/project/list").then((res) =>
        res.json()
      );
      setProjectList(data);
    })();
  }, []);
  //일지 리스트 호출
  useEffect(() => {
    selectProject &&
      (async () => {
        const data = await fetch(
          `/api/admin/journal/list?projectid=${selectProject.id}`
        ).then((res) => res.json());
        setJournalList(data);
      })();
  }, [selectProject]);

  //일지 본문 호출
  useEffect(() => {
    if (selectJournal) {
      if (selectJournal.id) {
        (async () => {
          const data = await fetch(
            `/api/admin/journal/post?journalid=${selectJournal.id}`
          ).then((res) => res.json());
          setTitle(data.journalTitle);
          setDescription(data.journalDescription);
        })();
      }
      if (!selectJournal.id) {
        setTitle("");
        setDescription("");
      }
    }
  }, [selectJournal]);

  const submit = async () => {
    if (selectJournal) {
      if (!selectJournal.id) {
        await fetch("/api/admin/journal/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId: selectProject.id,
            title: title,
            description: description,
          }),
        }).then(() => alert("완료되었습니다."));
      } else {
        await fetch("/api/admin/journal/post", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            journalId: selectJournal.id,
            title: title,
            description: description,
          }),
        }).then(() => alert("완료되었습니다."));
      }
    }
  };

  return (
    <ProfileWrapper>
      <div className="selectsWrap">
        <SelectWrap
          label="프로젝트 선택"
          addList={false}
          selectList={projectList}
          value={selectProject}
          setValue={setSelectProject}
        />

        <SelectWrap
          label="일지 선택"
          addList={true}
          selectList={journalList}
          value={selectJournal}
          setValue={setSelectJournal}
        />
      </div>
      <InputWrap
        label="일지 제목"
        type="text"
        value={title}
        setValue={setTitle}
      />
      <EditorWrap
        label="내용"
        postId={selectJournal.id}
        value={description}
        setValue={setDescription}
      />
      <div className="buttonWrap">
        <StyledButton onClick={submit} width={100} height={30}>
          저장
        </StyledButton>
      </div>
    </ProfileWrapper>
  );
};

export default function AdminMain() {
  const [isActive, setIsActive] = useState<number>(0);

  const navList = [
    {
      id: 1,
      menu: "프로필",
      content: <Profile />,
    },
    {
      id: 2,
      menu: "프로젝트",
      content: <Project />,
    },
    {
      id: 3,
      menu: "개발일지",
      content: <Journal />,
    },
  ];

  return (
    <>
      <AdminNav $isactive={isActive}>
        <AdminTitle title="menu" />
        <ul>
          {navList.map((list) => (
            <li key={list.id} onClick={() => setIsActive(list.id)}>
              {list.menu}
            </li>
          ))}
        </ul>
      </AdminNav>
      <Content>
        {navList.map(
          (list) =>
            list.id === isActive && <div key={list.id}>{list.content}</div>
        )}
      </Content>
    </>
  );
}

const AdminNav = styled.div<{ $isactive: number }>`
  width: 463px;
  height: 100%;
  padding: 100px 0 0 235px;
  ul {
    width: 184px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  li {
    cursor: pointer;
    font-size: 30px;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.objectColor};
  }
  li:nth-child(${({ $isactive }) => $isactive}) {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;
const Content = styled.div`
  width: calc(100% - 463px);
  height: 100%;
  background: ${({ theme }) => theme.colors.objectColor};
  padding: 136px 50px 0;
`;
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  .buttonWrap {
    display: flex;
    justify-content: right;
  }
  .selectsWrap {
    display: flex;
    gap: 10px;
  }
`;
