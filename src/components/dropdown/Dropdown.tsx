import { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";

import Popup from "../popup/Popup";
import { items } from "../../data/items";
import {
  Popups,
  Items,
  itemState,
  isOpenState,
  isPopupState,
} from "../../atoms/dropState";
import { MenuBlock, ToggleButtonBlock, DropDownBlock } from "./dropStyle";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenState);
  const [isPopupOpen, setIsPopupOpen] = useRecoilState<Popups>(isPopupState);
  const [menus, setMenus] = useRecoilState<Items>(itemState);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [ref, setIsOpen]);

  const onClick = () => {
    setIsOpen((prev) => !prev);
    setIsPopupOpen((state) => ({ ...state, firstPopup: false }));
  };

  const onItemClick = (data: Items) => {
    setIsPopupOpen((state) => ({ ...state, firstPopup: true }));
    setMenus(data);
  };

  return (
    <MenuBlock ref={ref}>
      <ToggleButtonBlock onClick={onClick} isOpen={isOpen}>
        <span>{isOpen ? "Close" : "Open"}</span>
        <span className="arrow">▼</span>
      </ToggleButtonBlock>
      <DropDownBlock isOpen={isOpen}>
        {items.map((data: Items, index) => (
          <>
            <li key={index} onClick={() => onItemClick(data)}>
              <img src={data.token_image} alt={data.token_name} />
              <span>{data.token_name}</span>
            </li>
            {isPopupOpen.firstPopup && <Popup menus={menus} />}
          </>
        ))}
      </DropDownBlock>
    </MenuBlock>
  );
};

export default Dropdown;
