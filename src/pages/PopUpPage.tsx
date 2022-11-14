import React, { useRef, useEffect } from "react";
import Popup from "../components/popup/Popup";
import { isPopupState } from "../atom/drop";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
`;

const PopUpPage = () => {
  // const [isPopupOpen, setIsPopupOpen] = useRecoilState<boolean>(isPopupState);
  // const ref = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   const onClickOutside = (e: MouseEvent) => {
  //     if (ref.current !== null && !ref.current.contains(e.target as Node)) {
  //       setIsPopupOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", onClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", onClickOutside);
  //   };
  // }, [ref, setIsPopupOpen]);
  // return <>{isPopupOpen && <Popup ref={ref} />}</>;
};

export default PopUpPage;
