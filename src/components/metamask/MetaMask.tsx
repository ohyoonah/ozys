import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { ethers } from "ethers";
import { popupState, walletState, IWallet } from "../../atom/meta";
import Wallet from "./Wallet";

const MetaMask = () => {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [isOpen, setIsOpen] = useRecoilState(popupState);
  const [wallet, setWallet] = useRecoilState<IWallet>(walletState);

  const connectWallet = useCallback(async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
        getMetamaskData();
      } else {
        alert("메타마스크를 설치해 주세요");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (wallet.chainId === 1) alert("이더리움 메인넷에 연결되었습니다.");
    getWalletData(signer);
  }, [wallet.chainId, signer]);

  const getProvider = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    return provider;
  };

  const getSigner = async (provider: any) => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
    return signer;
  };

  const getWalletData = async (signer: any) => {
    const result = await Promise.all([
      signer.getAddress(),
      signer.getBalance(),
      signer.getChainId(),
    ]);
    setWallet({
      address: result[0],
      balance: Number(result[1]),
      chainId: result[2],
    });
    setIsOpen(true);
  };

  const switchNetwork = useCallback(async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
      await getMetamaskData();
    } catch (switchError) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x13881",
              chainName: "Matic Mumbai",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
              blockExplorerUrls: ["https://mumbai.ploygonscan.com"],
            },
          ],
        });
        await getMetamaskData();
      } catch (addError) {
        console.log(addError);
      }
      console.log(switchError);
    }
  }, []);

  const getMetamaskData = useCallback(async () => {
    const _provider = await getProvider();
    const _signer = await getSigner(_provider);
    await getWalletData(_signer);
  }, []);

  return (
    <div>
      <button onClick={connectWallet}>지갑 열기</button>
      {isOpen && <Wallet switchNetwork={switchNetwork} />}
    </div>
  );
};

export default MetaMask;
