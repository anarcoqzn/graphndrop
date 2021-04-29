import styled from 'styled-components';

export const Container = styled.div`
  height: fit-content;
  width: 400px;
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  text-align: center;
  ul {
    list-style: none;
    li{
      padding: 10px;
      font-weight: bold;
      cursor: pointer;

      :hover{
          border: 1px solid black;
      }
    }
  }
`;
