import styled from "styled-components";

export const ButtonBlock = styled.button`
  width: 90%;
  height: 45px;
  position: absolute;
  bottom: 20px;
  background: var(--blue);
  color: white;
  border: none;
  border-radius: 8px;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;
