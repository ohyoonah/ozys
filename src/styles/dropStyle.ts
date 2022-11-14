import styled from "styled-components";

export const MenuBlock = styled.div`
  width: 200px;
`;

export const ButtonBlock = styled.button`
  width: 100%;
  height: 50px;
  margin-bottom: 8px;
  border: 1px solid gray;
  border-radius: 8px;
  cursor: pointer;
`;

export const DropDownBlock = styled.ul<{ isOpen: boolean }>`
  width: 100%;
  height: calc(50px * 10);
  margin: 0;
  padding: 0;
  border: 1px solid gray;
  border-radius: 8px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  overflow-y: auto;
  li {
    height: 50px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    list-style: none;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    &:active {
      font-size: 1.1rem;
      font-weight: 600;
    }
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
