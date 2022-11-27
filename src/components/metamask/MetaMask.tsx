import { useState, useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ethers } from "ethers";
import { popupState, walletState, MyWallet } from "../../atoms/metaMaskState";
import Wallet from "./Wallet";
import { WalletButtonBlock } from "./metaMaskStyle";

const MetaMask = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isOpen, setIsOpen] = useRecoilState(popupState);
  const setWallet = useSetRecoilState<MyWallet>(walletState);

  const getProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    return provider;
  };

  const getSigner = async (provider: ethers.providers.Web3Provider) => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
    return signer;
  };

  const getWalletData = useCallback(
    async (signer: ethers.providers.JsonRpcSigner) => {
      try {
        const result = await Promise.all([
          signer.getAddress(),
          signer.getBalance(),
          signer.getChainId(),
        ]);
        setWallet((wallet) => ({
          ...wallet,
          account: result[0],
          balance: Number(ethers.utils.formatEther(result[1])),
          chainId: result[2],
        }));
      } catch (e) {
        console.error(e);
      }
    },
    [setWallet]
  );

  const getMetamaskData = useCallback(async () => {
    try {
      const _provider = getProvider();
      const _signer = await getSigner(_provider);
      await getWalletData(_signer);
    } catch (e) {
      console.error(e);
    }
  }, [getWalletData]);

  const connectWallet = useCallback(async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        await getMetamaskData();
        setIsOpen(true);
      } else {
        alert("메타마스크를 설치해 주세요.");
        window.open(
          "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko"
        );
      }
    } catch (e) {
      console.error(e);
    }
  }, [getMetamaskData, setIsOpen]);

  return (
    <>
      <WalletButtonBlock onClick={connectWallet}>지갑 열기</WalletButtonBlock>
      {isOpen && <Wallet />}
    </>
  );
};

export default MetaMask;
