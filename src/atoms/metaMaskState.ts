import { atom } from "recoil";

export interface IWallet {
  account?: string;
  balance?: number;
  chainId?: number;
}

export const popupState = atom<boolean>({
  key: "walletOpen",
  default: false,
});

export const walletState = atom<IWallet>({
  key: "wallet",
  default: {
    account: "",
    balance: 0,
    chainId: 0,
  },
});
