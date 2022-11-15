import { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { isPopupState, Popups } from "../../atom/drop";
import { PopupBlock, Overlay } from "../../styles/popupStyle";

const SecondPopupBlock = styled(PopupBlock)`
  width: 500px;
  height: 250px;
`;

const ThirdPopupBlock = styled(PopupBlock)`
  width: 200px;
  height: 350px;
`;

const Popup = ({ menus }) => {
  const [isPopupOpen, setIsPopupOpen] = useRecoilState<Popups>(isPopupState);

  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const thirdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
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
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [firstRef, secondRef, thirdRef, setIsPopupOpen]);

  return (
    <>
      <Overlay ref={firstRef} />
      <PopupBlock>
        <img src={menus.token_image} alt="test" />
        <p>{menus.token_name}</p>
        <p>${menus.token_price}</p>
        <button
          className="open"
          onClick={() =>
            setIsPopupOpen((state) => ({ ...state, secondPopup: true }))
          }
        >
          팝업 추가
        </button>
        <button
          className="close"
          onClick={() =>
            setIsPopupOpen((state) => ({ ...state, firstPopup: false }))
          }
        >
          닫기
        </button>
      </PopupBlock>
      {isPopupOpen.secondPopup && (
        <>
          <Overlay ref={secondRef} />
          <SecondPopupBlock>
            <p>두 번째 팝업</p>
            <button
              className="open"
              onClick={() =>
                setIsPopupOpen((state) => ({ ...state, thirdPopup: true }))
              }
            >
              팝업 추가
            </button>
            <button
              className="close"
              onClick={() =>
                setIsPopupOpen((state) => ({ ...state, secondPopup: false }))
              }
            >
              닫기
            </button>
          </SecondPopupBlock>
        </>
      )}
      {isPopupOpen.thirdPopup && (
        <>
          <Overlay ref={thirdRef} />
          <ThirdPopupBlock>
            <p>세 번째 팝업</p>
            <button
              className="open"
              onClick={() => alert("팝업은 최대 세 개입니다.")}
            >
              팝업 추가
            </button>
            <button
              className="close"
              onClick={() =>
                setIsPopupOpen((state) => ({ ...state, thirdPopup: false }))
              }
            >
              닫기
            </button>
          </ThirdPopupBlock>
        </>
      )}
    </>
  );
};

export default Popup;
