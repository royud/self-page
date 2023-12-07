import { useEffect, useState } from "react";

import styled from "styled-components";

export default function Resume() {
  const [name, setName] = useState<string>("");
  const [work, setWork] = useState<string>("");
  const [stack, setStack] = useState<string[] | undefined[]>([]);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    (async () => {
      const data = await fetch("/api/profile").then((res) => res.json());
      if (data) {
        setName(data.name);
        setWork(data.work);
        setStack(data.stack);
        setEmail(data.email);
      }
    })();
  }, []);
  return (
    <Wrap>
      <div className="introduce">
        <div className="name">{name}</div>
        <div className="work">{work}</div>
        <ul className="stackList">
          {stack.map((list) => (
            <li key={list}>{list}</li>
          ))}
        </ul>
        <div className="email">
          <span>✉️</span>
          {email}
        </div>
      </div>
    </Wrap>
  );
}
const Wrap = styled.div`
  .introduce {
    padding-bottom: 30px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.objectColor};
  }
  .name {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  .work {
    font-size: 30px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.mainColor};
    margin-bottom: 15px;
  }
  .stackList {
    display: flex;
    gap: 5px;
  }
  .stackList li {
    padding: 3px 15px;
    background: ${({ theme }) => theme.colors.subTextColor};
    color: ${({ theme }) => theme.colors.white};
    font-size: 20px;
    border-radius: 15px;
    margin-bottom: 49px;
  }
  .email {
    font-size: 25px;
  }
  .email span {
    margin-right: 10px;
  }
`;
