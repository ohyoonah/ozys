import { atom } from "recoil";

export const isOpenState = atom<boolean>({
  key: "menuOpen",
  default: false,
});

export const isPopupState = atom<boolean>({
  key: "popupOpen",
  default: false,
});
