import styled from "styled-components";
import { PopupBlock } from "../popup/popupStyle";

export const WalletButtonBlock = styled.button`
  width: 200px;
  height: 50px;
  margin-right: 2rem;

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
