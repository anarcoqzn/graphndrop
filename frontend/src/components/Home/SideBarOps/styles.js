import styled from 'styled-components';

export const Container = styled.div`
  h3, h5{
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const ObjectInfo = styled.div`
  display: grid;
  grid-template-columns:auto auto;
  grid-row-gap: 2px;
  margin-top: 10px;
  height: fit-content;
  padding: 10px;
  grid-column-gap: 2px;
  border: ${props => `1px solid ${props.color}` || "1px solid #cdcd"};
  div{
    margin-top: 10px;
    border-bottom:1px solid black;
    border-right:1px solid black;
  }
  label {
    margin-top: 5px;
  }
`;
