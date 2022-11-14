import styled from "styled-components";

export const PopupBlock = styled.div`
  width: 300px;
  height: 300px;
  background: white;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 70px;
    height: 70px;
  }
  button {
    width: 50%;
    height: 50px;
    position: absolute;
    bottom: 0;
    border: none;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    &.open {
      left: 0;
      border-radius: 0 0 0 8px;
    }
    &.close {
      right: 0;
      border-radius: 0 0 8px 0;
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
`;
