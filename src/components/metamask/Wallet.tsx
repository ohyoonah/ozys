import { useEffect, useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { popupState, walletState, IWallet } from "../../atoms/metaMaskState";
import { Overlay } from "../popup/popupStyle";
import { WalletBlock } from "./metaMaskStyle";
import { ButtonBlock } from "../common/buttonStyle";

const Wallet = () => {
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
        <span className="account">
          <b>주소:</b> {wallet.account}
        </span>
        <span className="balance">
          <b>잔액:</b> {wallet.balance} ETH
        </span>
        <span className="chain">
          <b>네트워크:</b> {wallet.chainId}
        </span>
        {/* <div onClick={switchNetwork}>click</div> */}
        <ButtonBlock onClick={() => setIsOpen(false)}>닫기</ButtonBlock>
      </WalletBlock>
    </>
  );
};

export default Wallet;
