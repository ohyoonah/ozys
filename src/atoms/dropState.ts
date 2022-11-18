import { atom } from "recoil";

export interface Popups {
  firstPopup: boolean;
  secondPopup?: boolean;
  thirdPopup?: boolean;
}

export interface Items {
  token_image: string;
  token_name: string;
  token_price: number;
}

export const isOpenState = atom<boolean>({
  key: "menuOpen",
  default: false,
});

export const isPopupState = atom<Popups>({
  key: "popupOpen",
  default: {
    firstPopup: false,
    secondPopup: false,
    thirdPopup: false,
  },
});

export const itemState = atom<Items>({
  key: "items",
  default: {
    token_image: "",
    token_name: "",
    token_price: 0,
  },
});
