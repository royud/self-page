import { Loading } from "@/components";
import { useFetch } from "@/hooks/useFetch";

import styled from "styled-components";

type Data = {
  name: string;
  work: string;
  stack: string[] | undefined[];
  email: string;
};

export default function Resume() {
  const [fetchedData, isLoading] = useFetch<Data>("/api/profile");
  return (
    <Wrap>
      {isLoading && <Loading />}
      {fetchedData && (
        <div className="introduce">
          <div className="name">{fetchedData.name}</div>
          <div className="work">{fetchedData.work}</div>
          <ul className="stackList">
            {fetchedData.stack.map((list) => (
              <li key={list}>{list}</li>
            ))}
          </ul>
          <div className="email">
            <span>✉️</span>
            {fetchedData.email}
          </div>
        </div>
      )}
    </Wrap>
  );
}
const Wrap = styled.div`
  min-height: 600px;
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
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 49px;
  }
  .stackList li {
    padding: 3px 15px;
    background: ${({ theme }) => theme.colors.subTextColor};
    color: ${({ theme }) => theme.colors.white};
    font-size: 20px;
    border-radius: 15px;
  }
  .email {
    font-size: 25px;
  }
  .email span {
    margin-right: 10px;
  }
`;
