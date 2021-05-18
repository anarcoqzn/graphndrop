import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 4px solid grey;
  border-right: 4px solid grey;
  border-bottom: 4px solid grey;
  border-left: 4px solid tomato;
  background: transparent;
  width:2vw;
  height: 2vw;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
`;

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  margin-top: -25px;
  width: 100%;
  height: 50px;
`;

export function Loading(props) {
  return (
    <Container>
      <h1>{props.msg || "LOADING"}</h1>
      <LoadingSpinner />
    </Container>
  )
}

export function Error(props) {
  return (
    <Container>
      <h1>{props.msg}</h1>
    </Container>
  )
}