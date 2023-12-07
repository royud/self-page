import { createRef, forwardRef, useEffect, useState } from "react";

import styled from "styled-components";

import { useRouter } from "next/router";

import { AdminTitle } from "@/components/admin";

import { ROUTE_ADMIN } from "@/pages/const";

import LocalStorage from "@/utils/localstorage";

type LoginInputProps = {
  label: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  tryLogin: () => void;
};

const LoginInput = forwardRef<LoginInputProps, any>(function LoginInput(
  { label, type, value, setValue, tryLogin }: LoginInputProps,
  ref: React.Ref<any>
) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const onFocus = () => {
    setIsFocus(true);
  };
  const onBlur = () => {
    setIsFocus(false);
  };
  return (
    <StyledLoginInput $isfocus={isFocus}>
      <label htmlFor={label}>{label}</label>
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        id={label}
        value={value}
        ref={ref}
        onKeyPress={({ key }) => key === "Enter" && tryLogin()}
      />
    </StyledLoginInput>
  );
});

export default function AdminLogin() {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const IdRef = createRef<any>();
  const router = useRouter();
  useEffect(() => {
    IdRef.current.focus();
  }, []);

  const tryLogin = async () => {
    const res = await fetch(`/api/login?id=${id}&pw=${pw}`);
    const data = await res.json();
    if (res.status === 404) {
      alert(data.message);
    }
    if (res.status === 200) {
      localStorage.setItem("adminId", data.name);
      router.push(ROUTE_ADMIN);
    }
  };

  useEffect(() => {
    LocalStorage.getItem("adminId") === process.env.NEXT_PUBLIC_ADMIN_NAME &&
      router.push(ROUTE_ADMIN);
  }, []);
  return (
    <Wrap>
      <AdminTitle title="login" />
      <form>
        <LoginInput
          type="text"
          label="ID"
          value={id}
          setValue={setId}
          ref={IdRef}
          tryLogin={tryLogin}
        />
        <LoginInput
          type="password"
          label="PW"
          value={pw}
          setValue={setPw}
          tryLogin={tryLogin}
        />
      </form>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledLoginInput = styled.div<{ $isfocus: boolean }>`
  width: 300px;
  border-bottom: 1px solid
    ${({ $isfocus, theme }) =>
      $isfocus ? theme.colors.mainColor : theme.colors.objectColor};
  padding: 8px 0;
  display: flex;
  align-items: center;
  transition: border 0.3s;
  margin-bottom: 10px;
  label {
    width: 80px;
    font-size: 30px;
    font-weight: bold;
  }
  input {
    width: 100%;
    font-size: 20px;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors.descTextColor};
  }
`;
