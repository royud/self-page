import styled from "styled-components";

export const Loading = () => {
  return (
    <Wrap>
      <Spinner />
    </Wrap>
  );
};
const Wrap = styled.div`
  height: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rotationBack {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid;
  border-color: ${({ theme }) => theme.colors.mainTextColor}
    ${({ theme }) => theme.colors.mainTextColor} transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 3px solid;
    border-color: ${({ theme }) => theme.colors.mainColor}
      ${({ theme }) => theme.colors.mainColor} transparent;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    animation: rotationBack 0.5s linear infinite;
    transform-origin: center center;
  }
`;
