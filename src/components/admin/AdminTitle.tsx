import styled from "styled-components";

type AdminTitleProps = { title: string };

export const AdminTitle = ({ title }: AdminTitleProps) => {
  return (
    <Wrap>
      <div className="subTitle">ADMIN</div>
      <div className="title">{title.toUpperCase()}</div>
    </Wrap>
  );
};

const Wrap = styled.div`
  .subTitle {
    color: ${({ theme }) => theme.colors.subTextColor};
    margin-bottom: 11px;
    font-size: 20px;
  }
  .title {
    font-size: 35px;
    margin-bottom: 41px;
    font-weight: bold;
  }
`;
