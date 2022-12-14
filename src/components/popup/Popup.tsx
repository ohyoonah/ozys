import { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";

import { isPopupState, Popups } from "../../atoms/dropState";
import { PopupBlock, Overlay } from "./popupStyle";
import { ButtonBlock } from "../common/buttonStyle";

const Popup = ({ menus }) => {
  const [isPopupOpen, setIsPopupOpen] = useRecoilState<Popups>(isPopupState);

  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const thirdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickInside = (e: MouseEvent) => {
      if (
        firstRef.current !== null &&
        firstRef.current.contains(e.target as Node)
      ) {
        setIsPopupOpen((state) => ({ ...state, firstPopup: false }));
      }
      if (
        secondRef.current !== null &&
        secondRef.current.contains(e.target as Node)
      ) {
        setIsPopupOpen((state) => ({ ...state, secondPopup: false }));
      }
      if (
        thirdRef.current !== null &&
        thirdRef.current.contains(e.target as Node)
      ) {
        setIsPopupOpen((state) => ({ ...state, thirdPopup: false }));
      }
    };
    document.addEventListener("mousedown", onClickInside);
    return () => {
      document.removeEventListener("mousedown", onClickInside);
    };
  }, [firstRef, secondRef, thirdRef, setIsPopupOpen]);

  return (
    <>
      <Overlay ref={firstRef} />
      <PopupBlock>
        <img src={menus.token_image} alt="token" />
        <span className="tokenName">{menus.token_name}</span>
        <span>${menus.token_price}</span>
        <ButtonBlock
          onClick={() =>
            setIsPopupOpen((state) => ({ ...state, secondPopup: true }))
          }
        >
          νμ μΆκ°
        </ButtonBlock>
        <button
          className="close"
          onClick={() =>
            setIsPopupOpen((state) => ({ ...state, firstPopup: false }))
          }
        >
          X
        </button>
      </PopupBlock>
      {isPopupOpen.secondPopup && (
        <>
          <Overlay ref={secondRef} />
          <PopupBlock>
            <span className="popupText">λ λ²μ§Έ νμ</span>
            <ButtonBlock
              onClick={() =>
                setIsPopupOpen((state) => ({ ...state, thirdPopup: true }))
              }
            >
              νμ μΆκ°
            </ButtonBlock>
            <button
              className="close"
              onClick={() =>
                setIsPopupOpen((state) => ({ ...state, secondPopup: false }))
              }
            >
              X
            </button>
          </PopupBlock>
        </>
      )}
      {isPopupOpen.thirdPopup && (
        <>
          <Overlay ref={thirdRef} />
          <PopupBlock>
            <span className="popupText">μΈ λ²μ§Έ νμ</span>
            <ButtonBlock onClick={() => alert("νμμ μ΅λ μΈ κ°μλλ€.")}>
              νμ μΆκ°
            </ButtonBlock>
            <button
              className="close"
              onClick={() =>
                setIsPopupOpen((state) => ({ ...state, thirdPopup: false }))
              }
            >
              X
            </button>
          </PopupBlock>
        </>
      )}
    </>
  );
};

export default Popup;
