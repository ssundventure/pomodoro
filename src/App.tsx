import React from "react";
import styled from "styled-components";
import Timer from "./Timer";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: tomato;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

const Header = styled.h1`
  color: white;
  font-size: 3.5rem;
  margin-bottom: 3rem;
  font-weight: bold;
`;

function App() {
  return (
    <Container>
      <Header>Pomodoro</Header>

      <Timer></Timer>
    </Container>
  );
}

export default App;
