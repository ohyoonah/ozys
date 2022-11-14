import { useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { items } from "../../data/items";
import { isOpenState, isPopupState } from "../../atom/drop";
import Popup from "../popup/Popup";
import { MenuBlock, ButtonBlock, DropDownBlock } from "../../styles/dropStyle";

export interface Items {
  token_image: string;
  token_name: string;
  token_price: number;
}

const Dropdown = () => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenState);
  const [isPopupOpen, setIsPopupOpen] = useRecoilState<boolean>(isPopupState);
  const [menus, setMenus] = useState<{
    token_image: string;
    token_name: string;
    token_price: number;
  }>({
    token_image: "",
    token_name: "",
    token_price: 0,
  });

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
    setIsPopupOpen(false);
  };

  const onItemClick = (data: Items) => {
    setIsPopupOpen(true);
    setMenus(data);
  };

  return (
    <MenuBlock ref={ref}>
      <ButtonBlock onClick={onClick}>{isOpen ? "Close" : "Open"}</ButtonBlock>
      <DropDownBlock isOpen={isOpen}>
        {items.map((data: Items, index) => (
          <>
            <li key={index} onClick={() => onItemClick(data)}>
              <img src={data.token_image} alt={data.token_name} />
              <span>{data.token_name}</span>
            </li>
            {isPopupOpen && <Popup menus={menus} />}
          </>
        ))}
      </DropDownBlock>
    </MenuBlock>
  );
};

export default Dropdown;
