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
  }

  #new-conn{
    width: 100%;
    border-radius:0px;
  }
`;

export const ConnectionItem = styled.li`
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  :hover{
    color: #FFF;
  }
`;

export const ConnectionsContainer = styled.div`
  display: flex;
  background-color: ${props => (props.index % 2 === 0) ? "#A9A9A9" : "#DCDCDC" };
  align-items: center;
  svg {
    color: lightcoral;
    cursor: pointer;
    :hover{
      color: tomato;
    }
  }
`;
