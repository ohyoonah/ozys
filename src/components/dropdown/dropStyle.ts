import styled from "styled-components";

export const MenuBlock = styled.div`
  width: 200px;
`;

export const ToggleButtonBlock = styled.button<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 200px;
  height: 50px;
  margin-bottom: 8px;
  padding: 0 1rem;

  border: none;
  border-radius: 8px;

  background: var(--light-gray);

  font-weight: 600;
  letter-spacing: 1px;

  cursor: pointer;

  &:hover {
    border: 1px solid var(--dark-gray);
  }

  .arrow {
    color: var(--blue);

    transition: 0.125s all ease-in;
    transform: ${({ isOpen }) => isOpen && "rotate(180deg)"};
  }
`;

export const DropDownBlock = styled.ul<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  overflow-y: auto;

  width: 100%;
  height: calc(50px * 10);
  margin: 0;
  padding: 0;

  border: 1px solid var(--dark-gray);
  border-radius: 8px;

  background: var(--light-gray);

  li {
    display: flex;
    align-items: center;
    list-style: none;

    height: 50px;

    cursor: pointer;

    img {
      width: 25px;
      height: 25px;
      padding: 0 1rem;
    }

    &:hover,
    &:active {
      background: rgba(0, 0, 0, 0.1);
      font-weight: 600;
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: var(--blue);
  }
`;
