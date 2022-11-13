import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { dropData } from "./drop_data";

const MenuBlock = styled.div`
  width: 250px;
`;

const ButtonBlock = styled.button`
  width: 100%;
  height: 50px;
  margin-bottom: 8px;
  border: 1px solid gray;
  border-radius: 8px;
  cursor: pointer;
`;

const DropDownBlock = styled.ul<{ isOpen: boolean }>`
  width: 100%;
  height: calc(50px * 10);
  margin: 0;
  padding: 0;
  border: 1px solid gray;
  border-radius: 8px;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  overflow-y: auto;
  li {
    height: 50px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    list-style: none;
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
      margin-right: 20px;
      flex: 0.5;
    }
    span {
      flex: 2;
    }
  }
`;

interface IDropData {
  token_image: string;
  token_name: string;
  token_price: number;
}

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
  }, [ref]);

  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  const onLiClick = (data: IDropData) => {
    const tokenPrice = document.getElementById("tokenPrice");
    tokenPrice.innerHTML = `${data.token_name}: ${data.token_price} $ETH`;
  };

  return (
    <MenuBlock ref={ref}>
      <ButtonBlock onClick={onClick}>{isOpen ? "Close" : "Open"}</ButtonBlock>
      <DropDownBlock isOpen={isOpen}>
        {dropData.map((data: IDropData) => (
          <li onClick={() => onLiClick(data)}>
            <img src={data.token_image} alt={data.token_name} />
            <span>{data.token_name}</span>
          </li>
        ))}
      </DropDownBlock>
      {isOpen && <div id="tokenPrice" />}
    </MenuBlock>
  );
};

export default Dropdown;
