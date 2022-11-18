import styled from "styled-components";

export const PopupBlock = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 16px;
  z-index: 2;

  img {
    width: 60px;
    height: 60px;
    margin-top: 20%;
    margin-bottom: 1.5rem;
  }

  .tokenName {
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .popupText {
    line-height: 250px;
  }

  .close {
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    font-size: 1.3rem;

    &:hover {
      color: rgba(0, 0, 0, 0.5);
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
  z-index: 1;
`;
