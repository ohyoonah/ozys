import Dropdown from "./components/dropdown/Dropdown";
import MetaMask from "./components/metamask/MetaMask";
import styled from "styled-components";

const MainBlock = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 100px;
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
