import styled from 'styled-components';

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  margin-bottom: 10%;
  width: 50vw;
  height: 50vh;
  background-color: #FFF;
  justify-content: center;
  display: grid;
  align-items: center;
  border-radius: 5vw;
  grid-template-rows: auto auto auto auto;
  span {
    margin-left: auto;
    margin-right: auto;
    color: darkorange;
    font-weight: bolder;
    font-size: 2vw;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  #buttons {
    grid-row:4;
    display: grid;
    padding: 10px;
    grid-row-gap: 10px;
    margin-top: -40px;
  }

  #error{
    font-size: 1.2vw;
    height: .5vw;
    color: tomato;
  }
  #email{
    grid-row: 2;
  }
  #password{
    grid-row: 3;
    margin-top: -2vw;
  }
`;
