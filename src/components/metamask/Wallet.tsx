import { useEffect, useCallback } from "react";
import styled from "styled-components";
import { PopupBlock, Overlay } from "../../styles/popupStyle";
import { useRecoilState, useSetRecoilState } from "recoil";
import { popupState, walletState, IWallet } from "../../atom/meta";

const WalletBlock = styled(PopupBlock)`
  width: 500px;
  button {
    width: 100%;
  }
`;

const Wallet = ({ switchNetwork }) => {
  const [wallet, setWallet] = useRecoilState<IWallet>(walletState);
  const setIsOpen = useSetRecoilState<boolean>(popupState);

  const onChangeAddress = useCallback(
    (accounts: string) => {
      accounts !== wallet.account &&
        setWallet((wallet) => ({ ...wallet, account: accounts }));
    },
    [wallet.account, setWallet]
  );

  const onChangeChainId = useCallback(
    (chainId: number) => {
      chainId !== wallet.chainId &&
        setWallet((wallet) => ({ ...wallet, chainId: Number(chainId) }));
      // window.location.reload();
    },
    [wallet.chainId, setWallet]
  );

  useEffect(() => {
    wallet.chainId === 1 && alert("이더리움 메인넷에 연결되었습니다.");
    window.ethereum?.on("chainChanged", onChangeChainId);
    return () => {
      window.ethereum?.removeListener("chainChanged", onChangeChainId);
    };
  }, [wallet.chainId, onChangeChainId]);

  useEffect(() => {
    window.ethereum?.on("accountsChanged", onChangeAddress);
    return () => {
      window.ethereum?.removeListener("accountsChanged", onChangeAddress);
    };
  }, [onChangeAddress]);

  return (
    <>
      <Overlay />
      <WalletBlock>
        <p>주소: {wallet.account}</p>
        <p>잔액: {wallet.balance} ETH</p>
        <p>네트워크: {wallet.chainId}</p>
        <div onClick={switchNetwork}>click</div>
        <button onClick={() => setIsOpen(false)}>닫기</button>
      </WalletBlock>
    </>
  );
};

export default Wallet;
