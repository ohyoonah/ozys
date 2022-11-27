import styled from "styled-components";

export const ButtonBlock = styled.button`
  position: absolute;
  bottom: 20px;

  width: 90%;
  height: 45px;

  border: 0;
  border-radius: 8px;

  background: var(--blue);
  color: white;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;
