import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 5vh;
  width: 100%;
  background-color: lightcoral;
  text-align: center;
  align-items: center;
  font-weight: normal;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 10px;
  h1 {
    margin-right: auto;
    transition: .3s;
    :hover{
      color: #FFF;
      cursor: pointer;
    }
  }

  h2 {
    transition: .3s;
    :hover {
      color: #FFF;
      cursor: pointer;
    }
  }
`;
