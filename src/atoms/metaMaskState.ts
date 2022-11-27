import { atom } from "recoil";

export interface MyWallet {
  account?: string;
  balance?: number;
  chainId?: number;
}

export const popupState = atom<boolean>({
  key: "walletOpen",
  default: false,
});

export const walletState = atom<MyWallet>({
  key: "wallet",
  default: {
    account: "",
    balance: 0,
    chainId: 0,
  },
});
