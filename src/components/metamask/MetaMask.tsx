import { useState, useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ethers } from "ethers";
import { popupState, walletState, IWallet } from "../../atom/meta";
import Wallet from "./Wallet";

const MetaMask = () => {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [isOpen, setIsOpen] = useRecoilState(popupState);
  const setWallet = useSetRecoilState<IWallet>(walletState);

  const getProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    return provider;
  };

  const getSigner = async (provider: any) => {
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setSigner(signer);
    return signer;
  };

  const getWalletData = useCallback(
    async (signer: any) => {
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
  }, [getMetamaskData]);

  return (
    <div>
      <button onClick={connectWallet}>지갑 열기</button>
      {isOpen && <Wallet switchNetwork={switchNetwork} />}
    </div>
  );
};

export default MetaMask;
