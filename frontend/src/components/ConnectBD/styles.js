import styled from 'styled-components';

export const NewConnection = styled.div`
  width: 50%;
  display: grid;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 20px;
  background-color: linen;
  height: fit-content;
  padding: 5px;

  .inputs {
    display: grid;
    margin-left: auto;
    margin-right: auto;
    grid-row-gap: 3px;
  }

 h1 {
    margin-left: auto;
    margin-right: auto;
    color: darkblue;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const InstructionsContainer = styled.div`
  display: grid;
  h1{
    font-size: 20px;
    cursor: pointer;
  }
  p{
    padding: 5px;
  }
`;

export const InstructionsContent = styled.div`
  padding: 5px;
  display: grid;
  overflow: hidden;
  transition: 0.2s max-height;  
  max-height: ${props => props.maxHeight ? props.maxHeight : 0};
  
    pre{
      display: block;
      padding: 12.5px;
      margin: 0 0 13px;
      font-size: 15px;
      line-height: 1.625;
      word-break: break-all;
      word-wrap: break-word;
      color: #333;
      background-color: #f5f5f5;
      border: 1px solid #ccc;
      border-radius: 4px;
      overflow-x:auto;
    }
`;