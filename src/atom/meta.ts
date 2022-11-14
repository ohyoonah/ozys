import { atom } from "recoil";

export interface IWallet {
  address: string;
  balance: number;
  chainId: number;
}

export const popupState = atom({
  key: "isOpen",
  default: false,
});

export const walletState = atom<IWallet>({
  key: "wallet",
  default: {
    address: undefined,
    balance: undefined,
    chainId: undefined,
  },
});
