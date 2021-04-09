import styled from 'styled-components';

export const Input = styled.input`
width: 30vw;
height: 3vw;
transition: box-shadow .3s,border .3s;
border: 1px solid #f0f0f0;
font-size: 1.2vw;
padding: 10px;
border-radius: .5vw;

:hover {
  box-shadow:0 1px 20px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 20px 4px rgb(0 0 0 / 9%);
  border: 1px solid lightblue;
}
:focus {
  box-shadow:0 1px 20px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 20px 4px rgb(0 0 0 / 9%);
  border: 1px solid royalblue;
}
${props => props.wrong ? "border: 1px dashed coral;":null}
`