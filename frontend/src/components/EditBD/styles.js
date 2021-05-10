import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  border: 1px solid black;
  border-radius: 10px;
  width: 45vw;
  align-items: center;
  justify-items: center;
  padding: 10px;
  grid-row-gap: 10px;
  
/* mid screen alignment */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
/* -------------- */
  grid-template-columns: auto auto;
  
  h1, button {
    grid-column: 1 / 3;
  }
  .gridCol0 {
    grid-column: 1;
    width: fit-content;
    margin-left: auto;
  }

  .gridCol1{
    grid-column: 2;
  }

  svg {
    margin-right: auto;
    cursor: pointer;
  }
`;