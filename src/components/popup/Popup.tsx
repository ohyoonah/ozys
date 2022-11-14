import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isPopupState } from "../../atom/drop";
import { PopupBlock, Overlay } from "../../styles/popupStyle";

const SecondPopupBlock = styled(PopupBlock)`
  width: 500px;
  height: 250px;
`;

const ThirdPopupBlock = styled(PopupBlock)`
  width: 200px;
  height: 350px;
`;

const Popup = ({ menus }: any) => {
  const [isPopupOpen, setIsPopupOpen] = useRecoilState<boolean>(isPopupState);
  const [secondPopup, setSecondPopup] = useState(false);
  const [thirdPopup, setThirdPopup] = useState(false);

  const onClick = () => {
    setIsPopupOpen(false);
  };

  const onOpen = () => {
    setSecondPopup(true);
  };

  return (
    <>
      <Overlay />
      <PopupBlock>
        <img src={menus.token_image} alt="test" />
        <p>{menus.token_name}</p>
        <p>${menus.token_price}</p>
        <button className="close" onClick={onClick}>
          닫기
        </button>
        <button className="open" onClick={() => onOpen()}>
          팝업 추가
        </button>
      </PopupBlock>
      {secondPopup && (
        <>
          <Overlay />
          <SecondPopupBlock>
            <p>두 번째 팝업</p>
            <button className="close" onClick={() => setSecondPopup(false)}>
              닫기
            </button>
            <button className="open" onClick={() => setThirdPopup(true)}>
              팝업 추가
            </button>
          </SecondPopupBlock>
        </>
      )}
      {thirdPopup && (
        <>
          <Overlay />
          <ThirdPopupBlock>
            <p>세 번째 팝업</p>
            <button className="close" onClick={() => setThirdPopup(false)}>
              닫기
            </button>
            <button className="open">팝업 추가</button>
          </ThirdPopupBlock>
        </>
      )}
    </>
  );
};

export default Popup;
