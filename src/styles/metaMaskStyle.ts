import styled from "styled-components";
import { PopupBlock } from "./popupStyle";

export const WalletButtonBlock = styled.button`
  width: 200px;
  height: 50px;
  position: absolute;
  left: 40%;
  top: 50%;
  transform: translate(-40%, -50%);
  border: none;
  border-radius: 8px;
  background: var(--blue);
  color: white;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const WalletBlock = styled(PopupBlock)`
  width: 500px;
  z-index: 2;

  span {
    margin-top: 2rem;
  }

  span:first-child {
    margin-top: 4rem;
  }
`;
