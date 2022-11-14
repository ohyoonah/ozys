import styled from "styled-components";
import { PopupBlock, Overlay } from "../../styles/popupStyle";
import { useRecoilState, useRecoilValue } from "recoil";
import { popupState, walletState, IWallet } from "../../atom/meta";

const WalletBlock = styled(PopupBlock)`
  width: 500px;
  button {
    width: 100%;
  }
`;

const Wallet = ({ switchNetwork }) => {
  const wallet = useRecoilValue<IWallet>(walletState);
  const [isOpen, setIsOpen] = useRecoilState(popupState);

  return (
    <>
      <Overlay />
      <WalletBlock>
        <p>주소: {wallet.address}</p>
        <p>잔액: {wallet.balance} ETH</p>
        <p>네트워크: {wallet.chainId}</p>
        <div onClick={switchNetwork}>click</div>
        <button onClick={() => setIsOpen(false)}>닫기</button>
      </WalletBlock>
    </>
  );
};

export default Wallet;
