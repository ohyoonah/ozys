import Dropdown from "./components/dropdown/Dropdown";
import MetaMask from "./components/metamask/MetaMask";
import styled from "styled-components";

const MainBlock = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const App = () => {
  return (
    <MainBlock>
      <MetaMask />
      <Dropdown />
    </MainBlock>
  );
};

export default App;
