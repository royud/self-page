import { useState, useEffect } from "react";

import styled from "styled-components";

import dynamic from "next/dynamic";

const EditorContainer = dynamic(
  () => import("@/components").then((m) => m.EditorContainer),
  { ssr: false }
);
type InputWrapProps = {
  label: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

type TextareaWrapProps = Pick<InputWrapProps, "label">;

type SelectWrapProps = {
  label: string;
  addList: boolean;
  selectList: {
    id: number;
    title: string;
  }[];
  value: {
    id: number;
    title: string;
  };
  setValue: React.Dispatch<
    React.SetStateAction<{
      id: number;
      title: string;
    }>
  >;
};

export const SelectWrap = ({
  label,
  addList,
  selectList,
  value,
  setValue,
}: SelectWrapProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const [optionList, setOptionList] = useState<{ id: number; title: string }[]>(
    [{ id: 0, title: "" }]
  );

  useEffect(() => {
    if (selectList.length) {
      if (addList) {
        setOptionList([{ id: 0, title: "새로 작성" }, ...selectList]);
      } else {
        setOptionList([...selectList]);
      }
    }
  }, [selectList]);

  useEffect(() => {
    if (optionList.length) {
      setValue(optionList[0]);
    }
  }, [optionList]);

  return (
    <Wrap>
      <label>{label}</label>
      <StyledSelectWrap $isactive={isActive}>
        <div className="header" onClick={() => setIsActive(!isActive)}>
          {value.title}
        </div>
        <ul>
          {optionList.map((list) => (
            <li
              key={list.id}
              onClick={() => {
                setValue(list);
                setIsActive(false);
              }}
            >
              {list.title}
            </li>
          ))}
        </ul>
      </StyledSelectWrap>
    </Wrap>
  );
};

export const InputWrap = ({ label, type, value, setValue }: InputWrapProps) => {
  return (
    <Wrap>
      <label>{label}</label>
      <div className="textBox">
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </Wrap>
  );
};

export const EditorWrap = ({
  label,
  value,
  setValue,
  postId,
}: TextareaWrapProps) => {
  return (
    <Wrap>
      <label>{label}</label>
      <EditorContainer value={value} setValue={setValue} postId={postId} />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  label {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.descTextColor};
  }
  .textBox {
    border-radius: 5px;
    background: ${({ theme }) => theme.colors.white};
    padding: 5px 15px;
  }
  .textBox input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
  }
  .textBox textarea {
    width: 100%;
    height: 450px;
    border: none;
    outline: none;
    font-size: 20px;
    resize: none;
  }
  .toastui-editor-main-container {
    background: ${({ theme }) => theme.colors.white};
  }
`;
const StyledSelectWrap = styled.div<{ $isactive: boolean }>`
  position: relative;
  font-size: 20px;
  .header {
    cursor: pointer;
    width: 400px;
    padding: 5px 15px;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  ul {
    position: absolute;
    left: 0;
    top: 50px;
    width: 400px;
    padding: 10px;
    border-radius: 5px;
    z-index: 100;
    background: ${({ theme }) => theme.colors.white};
    display: flex;
    flex-direction: column;
    visibility: ${({ $isactive }) => ($isactive ? "visible" : "hidden")};
    gap: 10px;
    box-shadow: 0 0 5px 0 gray;
  }
  li {
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;
